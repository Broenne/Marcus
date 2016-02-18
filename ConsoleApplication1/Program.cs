using Autofac;
using IronPython.Hosting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication1;

using IronPython.Hosting;
using Microsoft.Scripting;
using Microsoft.Scripting.Hosting;
using MathNet.Numerics.LinearAlgebra;
using MathNet.Numerics.LinearAlgebra.Double;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {

            // methode der kleinsten quadrate
            // http://www.abi-mathe.de/buch/matrizen/methode-der-kleinsten-quadrate/
            var xyPoints = new double[, ] { 
                     {0, 2},
                     {1, 1},
                     {2, 0},
                     {3, -1},
                     {4, 1}
            };

            // 3 entspricht a0,a1, a2            
            var A = new double[xyPoints.GetLength(0),3];
            var b = new double[xyPoints.GetLength(0)];

            // initialize (notwendig??s)
            int hhh = 0;
            for (int row = 0; row < A.GetLength(0); row++)
            {               
                for (int column = 0; column < A.GetLength(1); column++)
                {
                    A[row,column] = hhh;
                    hhh++;
                }
            }

            // add values
            // f(x)=a0 + a1⋅x + a2⋅x2  
            for (int row = 0; row < A.GetLength(0); row++) // is 5 row = count of xy points
            {                
                var xPoint = xyPoints[row,0]; // 0 is X-Value
                var yPoint = xyPoints[row,1]; // 1 is Y Value
                // add yPoint to result matrix
                b[row] = yPoint;
                for (int column = 0; column < A.GetLength(1); column++) // is  3
                {
                    // fill A Matrix
                    var aFactor = Math.Pow(xPoint, column); // 0 is x-value                      
                    A[row,column] = aFactor;                   
                    Console.Write(A[row, column] + " ");
                    // fill b Matrix
                    
                }
                Console.WriteLine(Environment.NewLine);
            }

            Console.WriteLine("b-Matrix: ");
            foreach (var uu in b)
            {
                Console.Write(uu + " ");
            }


            // create matriv with math.net
            Matrix<double> AMatrix = DenseMatrix.OfArray(A);
            Matrix<double> bMatrix = new DenseMatrix(xyPoints.GetLength(0), 1,b);
            Matrix<double> AMatrixTranspose = AMatrix.Transpose();

            // Um diese Gleichung zu lösen werden nun AT⋅A und AT⋅b berechnet:
            var ATxA = AMatrixTranspose * AMatrix;
            var ATxB = AMatrixTranspose * bMatrix;

            var result= ATxA.Solve(ATxB);

            Console.WriteLine(Environment.NewLine);
            var resultArray = result.ToArray();
            
            foreach (var factor in resultArray)
            {
                Console.WriteLine("ax: " + factor);
            }

            //results from homepage
            Console.WriteLine("a0: " + (79.0/35));
            Console.WriteLine("a1: " +-(74.0/35));
            Console.WriteLine("a2: " + 3.0/7);            

            Console.WriteLine(A);            

            Console.ReadKey();


#if false
            ScriptEngine engine = Python.CreateEngine();
            Console.WriteLine(engine.GetHashCode());
            ScriptScope scope =engine.CreateScope();
            scope.SetVariable("foo", 4);

            ScriptEngine engine2 = Python.CreateEngine();
            Console.WriteLine(engine2.GetHashCode());
            ScriptScope scope2 = engine2.CreateScope();
            scope2.SetVariable("foo", 2);

            // execute the script
            //engine.ExecuteFile(@"C:\path\to\script.py");

            var path = @"C:\Users\Marcus\Documents\Visual Studio 2015\Projects\ConsoleApplication1\ConsoleApplication1\hello.py";
            var path2 = @"C:\Users\Marcus\Documents\Visual Studio 2015\Projects\ConsoleApplication1\ConsoleApplication1\hello.py";


            var one =new test();
            var two = new test();

         

            Parallel.Invoke(
                () => { one.test1(); },
                () => { two.test1(); ; }
                );

            // execute and store variables in scope

            // variables and functions defined in the scrip are added to the scope
            //scope.SomeFunction();



            //Console.WriteLine("Hallo");

            //var xxx = new ContainerBuilder(); 
            //xxx.RegisterType<test>();
            //IContainer con=xxx.Build();

            //using (var ooo = con.BeginLifetimeScope())
            //{
            //    var www=ooo.Resolve<test>();
            //}

            //for(int i = 0; i < 10; i++)
            //{ 
            //    var ccc=new SignalRTargetHub();
            //    ccc.Hello();
            //}

            //var scope=con.BeginLifetimeScope();
            //scope.Resolve<test>();
            //scope.Dispose();
            //Console.ReadKey();
 #endif
        }      

     }


        public class test : IDisposable
        {
            private static int num = 1;

            public async void test1()
            {
                int tt = num + 1;

                ScriptEngine engine = Python.CreateEngine();
                ScriptScope scope = engine.CreateScope();
                Console.WriteLine("vvv" + engine.GetHashCode());
                scope.SetVariable("foo", tt);

                //ScriptEngine engine2 = Python.CreateEngine();
                ////ScriptScope scope2 = engine2.CreateScope();
                //scope2.SetVariable("foo", 2);

                // execute the script
                //engine.ExecuteFile(@"C:\path\to\script.py");

                var path = @"C:\Users\Marcus\Documents\Visual Studio 2015\Projects\ConsoleApplication1\ConsoleApplication1\hello1.py";
                //var path = @"C:\Users\Marcus\Documents\Visual Studio 2015\Projects\ConsoleApplication1\ConsoleApplication1\hello.py";

                engine.Execute(path, scope);

                var fff = engine.CreateScriptSourceFromFile(path);
                fff.Execute(scope);
                //engine.Execute();
            }


            public void Dispose()
            {
                Console.WriteLine("dispose");
                //throw new NotImplementedException();
            }
        }
    }
