/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ilri;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.Socket;
import java.nio.charset.Charset;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;
import java.util.logging.Level;
import java.util.logging.Logger;
import sun.misc.IOUtils;

/**
 *
 * @author luther
 */
public class ilriprocessor implements Runnable {
     public Socket socket = null;
    public Vector handlers = new Vector();
    public Vector msgHandlers = new Vector();
    public Vector connectedclients = new Vector();
    public String liner = "";
    public String line = "";
    Vector keeper = new Vector ();
    private boolean states = true;
    private java.util.Date lastMessageTime = new java.util.Date(); // The last time a msg was sent
    private int connectionGracePeriod = 5; // The max time period given for a connection to be idle
    private boolean notremoved = true; // Indicates whether this connection has been removed from handler
    public BufferedReader in;
    public InputStream in2;
    //private csBufferedReader into;
    public PrintWriter out;
    public OutputStream out2;
    File file = new File("logs/receiver.log");
    //instantiate the class here
    public ilriserver serv;
    public ILRI ilr;
    public ilrilogger rl;
    public ilrifunctions fns;
    public ilriprocessor(ilriserver server) throws IOException
    {
        socket=server.socket;
        handlers=server.handlers;
        ilr=server.ilri;
        fns=new ilrifunctions();
        in2 = socket.getInputStream();
        in = new BufferedReader(new InputStreamReader(in2));
        //into = new csBufferedReader(new InputStreamReader(socket.getInputStream()));
        out2 = socket.getOutputStream();
	out = new PrintWriter(new OutputStreamWriter(out2));
        
        //This thread will now ensure that last logs into the reciver is sent to 
        //the third party applications.
        //any applicatio connected to this server port will be able to recieve processed NMEA
        //data
        Thread chkcons = new Thread(new Runnable() 
        {
            public void run() 
            {
                while(states)
                {
                    //activelook();
                  //  RecieverSimulate();
                    String antennadata=ilr.gotdata;
                    String clean=null;
                    if (antennadata.startsWith ("$GPGGA", 0)|| antennadata.startsWith ("$GPGLL", 0)
|| antennadata.startsWith ("$GPGSA", 0)
|| antennadata.startsWith ("$GPGSV", 0))
                    {
                        clean = fns.DatatoSend(antennadata);
                        
                        ilr.save_tofile("Received Stream="+antennadata+"\n\r------Processed Result----\n\r"+clean+"\n\r");
                   out.println("Received Stream="+antennadata+"\n\r------Processed Result----\n\r"+clean+"\n\r");
                   out.flush();
                    }
                  try
                    {
                        Thread.sleep(800);
                    }
                    catch(Exception err){}  
                }
            }
        });
        chkcons.setDaemon(false);
        chkcons.start();
    }
    
    
  
    @Override
    public void run() {
        
         //Lets see who this is
        System.out.println("Testing if socket is bound to address. For connection limit test");
        if(socket.isBound())
        {
            System.out.println("Client connected from address : " + socket.getInetAddress().getHostAddress() + " at port: " + socket.getPort());
            }
        
        
            //connectedclients.contains(socket.getInetAddress().getHostAddress()); check if ip is in the vector.
            if(handlers.size() >= 20)
            {
                System.out.println(" rejecting this one : IP: " + socket.getInetAddress().getHostAddress() + " Total Connections: " + handlers.size());
                out.println("too many connections. I will reject this one. Try again later.\n\r");
                out.flush();
                try
                {
                    in.close();
                    out.close();
                    in2.close();
                    out2.close();
                    socket.close();
                }
                catch(Exception err){}
            }
            else
            {
                System.out.println("Threads active before : " + handlers.size());
                synchronized(handlers) 
                {
                    handlers.addElement(this);
                    connectedclients.addElement(socket.getInetAddress().getHostAddress());
                    
                    System.out.println(" Threads active after : " + handlers.size());
                }
                //readData3();
            }
        
       }
    
}
