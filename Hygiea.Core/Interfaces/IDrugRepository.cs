using Hygiea.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Hygiea.Core.Interfaces
{
    public interface IDrugRepository
    {
        Task<bool> AddDrugAsync(Drug drug);
        Task<bool> DeleteDrugAsync(string id);
        Task<IEnumerable<Drug>> GetAllDrugsAsync();
        Task<Drug> FindDrugByID(string id);
        Task<bool> UpdateDrug(Drug drugs);
        Task<IEnumerable<Drug>> FinishedDrugs();
        Task<IEnumerable<Drug>> AboutToFinishdDrug();
    }
}
