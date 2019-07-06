using Hygiea.Core.Entities;
using Hygiea.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hygiea.Infrastructure.Repository
{
    public class DrugRepository : IDrugRepository
    {
        private readonly Database.DataContext dataContext;
        public DrugRepository(Database.DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task<IEnumerable<Drug>> AboutToFinishdDrug()
        {
            return await dataContext.Drugs.Where(x=>x.Quantity <= 3).ToListAsync();
        }

        public async Task<bool> AddDrugAsync(Drug drug)
        {
            if (drug == null) return false;
            var drugs = new Drug{
                Id = $"HYGD - {new Random().Next(1111111,9999999)}",
                Name = drug.Name,
                Price = drug.Price,
                Quantity = drug.Quantity,
                DateAdded = DateTime.Now.ToString()
            };
            await dataContext.Drugs.AddAsync(drugs);
            return await dataContext.SaveChangesAsync() == 1;
        }

        public async Task<bool> DeleteDrugAsync(string id)
        {
            if (id != null)
            {
                var find = await dataContext.Drugs.SingleOrDefaultAsync(x => x.Id == id);
                dataContext.Drugs.Remove(find);
                return await dataContext.SaveChangesAsync() == 1;
            }
            return false;
        }

        public async Task<Drug> FindDrugByID(string id)
        {
            if (id == null) return null;
            var findId = await dataContext.Drugs.SingleOrDefaultAsync(x => x.Id == id);
            return findId;
        }

        public async Task<IEnumerable<Drug>> FinishedDrugs()
        {
            return await dataContext.Drugs.Where(x=>x.Quantity == 0).ToListAsync();
        }

        public async Task<IEnumerable<Drug>> GetAllDrugsAsync()
        {
            return await dataContext.Drugs.ToListAsync();
        }

        public async Task<bool> UpdateDrug(Drug drugs)
        {
            if (drugs != null)
            {
                var drugToUpdate = await dataContext.Drugs.SingleAsync(x=>x.Id == drugs.Id);
                drugToUpdate.Name = drugs.Name;
                drugToUpdate.Price = drugs.Price;
                drugToUpdate.Quantity = drugs.Quantity;
                return (await dataContext.SaveChangesAsync()==1);
            }
            return false;

            //a logic for the updating drug
        }
    }
}
