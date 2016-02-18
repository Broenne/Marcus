using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(SignalRStartup))]
public class SignalRStartup
{
    public void Configuration(IAppBuilder app)
    {
        app.MapSignalR();
    }
}