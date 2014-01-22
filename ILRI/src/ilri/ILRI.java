/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ilri;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

/**
 *
 * @author luther
 */
public class ILRI 
{
static Thread s1;
public static int serverport=3000;
public String gotdata=null;
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
    //save_tofile("Starting System"); 
     Thread uzi3 = new Thread(new ilriserver(serverport, this));
            uzi3.setDaemon(false);
            uzi3.start();
            Thread chkcons = new Thread(new Runnable() 
        {
            public void run() 
            {
                while(true)
                {
                    //activelook();
                  
                    AerialSimulator();
                   
                }
            }
        });
        chkcons.setDaemon(false);
        chkcons.start();
}

public void AerialSimulator()
{
  BufferedReader br = null;
 
		try {
 
			String sCurrentLine;
 
			br = new BufferedReader(new FileReader("logs/receiver.log"));
 
			while ((sCurrentLine = br.readLine()) != null) {
                            gotdata=sCurrentLine;
				System.out.println(sCurrentLine);
                                 try
                    {
                        Thread.sleep(800);
                    }
                    catch(Exception err){}
			}
 
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (br != null)br.close();
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}  
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
