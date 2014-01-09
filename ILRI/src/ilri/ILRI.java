/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ilri;

/**
 *
 * @author luther
 */
public class ILRI {
static Thread s1;
public static int serverport=3000;
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
     Thread uzi3 = new Thread(new ilriserver(serverport, this));
            uzi3.setDaemon(false);
            uzi3.start();
}
    public static void main(String[] args) {
        // TODO code application logic here
        ILRI test=new ILRI();
        test.init();
    }

   
}
