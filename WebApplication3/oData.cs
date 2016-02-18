using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3
{
    using System.Web.Http.OData.Builder;

    using Microsoft.Data.Edm;

    public class oData
    {

        public IEdmModel GetOData()
        {
            var builder =new ODataConventionModelBuilder();
            builder.EntitySet<string>("Courses");
            var xxx= builder.GetEdmModel();
            
            return xxx;
        }
    }
}