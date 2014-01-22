/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ilri;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Vector;

/**
 *
 * @author luther
 */
public class ilriserver extends Thread {
    
        public Socket socket = null;
    public Vector handlers = new Vector();
    public ServerSocket serverSocket = null;
    public int port;
     public PrintWriter out;
    public ILRI ilri;
    
    //initialize the class
    public ilriserver(int ports, ILRI ilris)
    {
     port=ports;
     ilri=ilris;
    }
    
    @Override
    public void run() 
    {
        try 
        {
            serverSocket = new ServerSocket(port);
            System.out.println("Successfully set up the ilri server on port: " + port);
            
            while(true) 
            {
                //wait here for any connection
                socket = serverSocket.accept();
                //a thread for every connection
                
                System.out.println("New Client Recieved Here: " + port);
            
               Thread process = new Thread(new ilriprocessor(this));
                process.setDaemon(false);
                process.start();
            }
        } 
        catch(IOException ioe) 
        {
            ioe.printStackTrace();
        } 
        finally 
        {
            try 
            {
                serverSocket.close();
            } catch(IOException ioe) 
            {
                ioe.printStackTrace();
            }
        }
    }
}
