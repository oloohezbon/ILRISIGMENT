/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ilri;

/**
 *
 * @author luther
 */
public class ILRI 
{
static Thread s1;
public static int serverport=3000;
public boolean debug_mode = true;
    public ilrilogger rl = null;
    //public systemLogger tl = null;
    public String logging = "true";
    public boolean log_to_file = true;
    public String logtofile = "true";
//thread to keep the deamon running.
    /**
     * @param args the command line arguments
     */
//instantiate the above class.
void ILRI()
{
 
}
void init()
{
    rl = new ilrilogger();
    rl.logtofile = log_to_file;
    save_tofile("Starting System"); 
     Thread uzi3 = new Thread(new ilriserver(serverport, this));
            uzi3.setDaemon(false);
            uzi3.start();
}
public final void save_tofile(String data)
    {
        System.out.println("savinf to file");
        if(debug_mode)
        {
            try
            {
                
                rl.println(data);
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }
    }
    public static void main(String[] args) {
        // TODO code application logic here
        ILRI test=new ILRI();
        test.init();
    }

   
}
