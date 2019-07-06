using AutoMapper;
using Hygiea.Core.DTOs;
using Hygiea.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Hygiea.Utilities
{
    public class MappingProfile : Profile, IProfileExpression
    {
        public MappingProfile()
        {
            CreateMap<User, UserDTO>()
                .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => "")); ;
            CreateMap<UserDTO, User>();
            CreateMap<Drug,DrugDTO>();
            CreateMap<DrugDTO,Drug>();
            CreateMap<Appointment, AppointmentDTO>()
            .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User.Id));
            CreateMap<AppointmentDTO,Appointment>();
           
            
        }
    }

    public class Mappings
    {
        public static void RegisterMappings()
        {
            var all =
                Assembly
                .GetEntryAssembly()
                .GetReferencedAssemblies()
                .Select(Assembly.Load)
                .SelectMany(x => x.DefinedTypes)
                .Where(type => typeof(IProfileExpression).GetTypeInfo().IsAssignableFrom(type.AsType()));

            foreach (var ti in all)
            {
                var t = ti.AsType();
                if (t.Equals(typeof(IProfileExpression)))
                    Mapper.Initialize(cfg => {
                        cfg.AddProfile<MappingProfile>(); // Initialise each Profile classe
                    });
            }
        }
    }
}
