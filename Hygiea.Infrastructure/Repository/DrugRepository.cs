using Hygiea.Core.Entities;
using Hygiea.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
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

        public async Task<bool> AddDrugAsync(Drug drug)
        {
            if (drug == null) return false;
            await dataContext.Drugs.AddAsync(drug);
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

        public async Task<Drug> FindDrugByName(string name)
        {
            if (name == null) return null;
            var findName = await dataContext.Drugs.SingleOrDefaultAsync(x => x.Name == name);
            return findName;
        }

        public async Task<IEnumerable<Drug>> GetAllDrugsAsync()
        {
            return await dataContext.Drugs.ToListAsync();
        }

        public async Task<bool> UpdateDrug(Drug drugs)
        {
            if (drugs != null)
            {
                var find = await dataContext.Drugs.FindAsync(drugs.Id);
                dataContext.Drugs.Update(find);
                return true;
            }
            return false;

            //a logic for the updating drug
        }
    }
}
