using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3
{
    using System.Diagnostics;

    using NUnit.Framework;

    public class oDataTest
    {
        //[SetUp]
        //void Setup()
        //{
           

        //}

        [Test]
        public void test()
        {
            var xxx=new oData();
            var yyy=xxx.GetOData();
            Debug.Write(yyy);
        }
       
    }
}