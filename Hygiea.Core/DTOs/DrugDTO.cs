﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Hygiea.Core.DTOs
{
    public class DrugDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string DateAdded { get; set; }
        public int Price { get; set; }
    }
}
