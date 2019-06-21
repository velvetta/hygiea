using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Hygiea.Core.DTOs;
using Hygiea.Core.Entities;
using Hygiea.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hygiea.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrugController : ControllerBase
    {
        private readonly IDrugRepository drugRepository;
        private readonly IMapper mapper;
        public DrugController(IDrugRepository drugRepository, IMapper mapper)
        {
            this.drugRepository = drugRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> AddDrugs([FromBody] DrugDTO drugDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            if (drugDTO == null) return BadRequest("Wrong data supplied");
            
            var drug = mapper.Map<DrugDTO, Drug>(drugDTO);
            if(await drugRepository.AddDrugAsync(drug))
                return Ok(drug.Id);
            return BadRequest("Drug already exist !!!!");
            
           
        }

        [HttpDelete]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteDrugs(string id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            if (id != null)
            {
                if (await drugRepository.DeleteDrugAsync(id))
                    return Ok("Success");
                return BadRequest("Not Successful");
            }
            return BadRequest();
        }
        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public async Task<IEnumerable<DrugDTO>> GetDrugs()
        {
            if (!ModelState.IsValid)
                return null;
            var drug = await drugRepository.GetAllDrugsAsync();
            var drugDtoCollection = new List<DrugDTO>();
            drug.ToList().ForEach(x => drugDtoCollection.Add(mapper.Map<Drug, DrugDTO>(x)));
            return drugDtoCollection;
        }

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public async Task<DrugDTO> GetDrug(string name)
        {
            if (!ModelState.IsValid)
                return null;

            var drug = await drugRepository.FindDrugByName(name);
            var drugDto = mapper.Map<Drug, DrugDTO>(drug);
            return drugDto;
        }

      //update drugs
    }
}