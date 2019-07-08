using System;
using AutoMapper;
using Hygiea.Core.DTOs;
using Hygiea.Core.Entities;
using Hygiea.Core.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Hygiea.Utilities {
    public class AppointmentUserResolver : IValueResolver<AppointmentDTO, Appointment, User>
    {
        private readonly IUserRepository userRepository;

        public AppointmentUserResolver(IServiceProvider serviceProvider)
        {
            userRepository = serviceProvider.GetRequiredService<IUserRepository>();
        }

        public User Resolve(AppointmentDTO source, Appointment destination, User destMember, ResolutionContext context ){
            var user = userRepository.FindUser(source.User.ToString());
            if(user != null){
                destination.User = user;
                return user;
            }
            return null;
        }
    }
}