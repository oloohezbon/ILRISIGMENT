/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ilri;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Vector;

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
    private boolean states = true;
    private java.util.Date lastMessageTime = new java.util.Date(); // The last time a msg was sent
    private int connectionGracePeriod = 5; // The max time period given for a connection to be idle
    private boolean notremoved = true; // Indicates whether this connection has been removed from handler
    public BufferedReader in;
    public InputStream in2;
    //private csBufferedReader into;
    public PrintWriter out;
    public OutputStream out2;
    //instantiate the class here
    public ilriserver serv;
    public ILRI ilr;
    public ilriprocessor(ilriserver server) throws IOException
    {
        socket=server.socket;
        handlers=server.handlers;
        ilr=server.ilri;
        in2 = socket.getInputStream();
        in = new BufferedReader(new InputStreamReader(in2));
        //into = new csBufferedReader(new InputStreamReader(socket.getInputStream()));
        out2 = socket.getOutputStream();
	out = new PrintWriter(new OutputStreamWriter(out2));
        
        //This thread will ensure that the connection is terminated if idle for a given time
        Thread chkcons = new Thread(new Runnable() 
        {
            public void run() 
            {
                while(states)
                {
                    activelook();
                    try
                    {
                        Thread.sleep(5000);
                    }
                    catch(Exception err){}
                }
            }
        });
        chkcons.setDaemon(false);
        chkcons.start();
    }
  public void readData3()
    {
        try 
        {
            out.println("# Connection will close if left idle to ease resources\n\r\n\r");
            out.println("# HOW TO USE: INPUT OR PASTE GPGGA AND PRESS ENTER FOR RESULT\n\r");
            
            out.flush();
            while(((liner = in.readLine()) != null) && states)
            {
                liner = liner.trim();
               
                if(liner.contains("GPGGA"))
                {
                    
                     String[] res=liner.split(",");
                  out.println("#############################RESULT##################################");
                  ilr.save_tofile("#############################RESULT##################################");
                  out.println("Global Positioning System Fix Data Simulation");
                  ilr.save_tofile("Global Positioning System Fix Data Simulation");
                 
                 out.println("TIME OF DATA(UTC): =" +""+res[1].substring(0, 2)+":"+res[1].substring(2, 3)+res[1].substring(3, 4)+":"+res[1].substring(4, res[1].length()));
                 ilr.save_tofile("TIME OF DATA(UTC): =" +""+res[1].substring(0, 2)+":"+res[1].substring(2, 3)+res[1].substring(3, 4)+":"+res[1].substring(4, res[1].length()));
                 
                 out.println("LATITUDE OF POSITION: =" +""+res[2]+""+res[3]);
                 ilr.save_tofile("LATITUDE OF POSITION: =" +""+res[2]+""+res[3]);
             
                 out.println("POLE: =" +""+res[3]);
                 ilr.save_tofile("POLE: =" +""+res[3]);
           
                 out.println("LONGITUDE: =" +""+res[4]+""+res[5]);
                 ilr.save_tofile("LONGITUDE: =" +""+res[4]+""+res[5]);
          
                 out.println("POLE: =" +""+res[5]);
                ilr.save_tofile("POLE: =" +""+res[5]);
           
                 out.println("GPS QUALITY: =" +""+res[6]);
                ilr.save_tofile("GPS QUALITY: =" +""+res[6]);
      
                 out.println("NO. OF SATELITES IN USE: =" +""+res[7]);
               ilr.save_tofile("NO. OF SATELITES IN USE: =" +""+res[7]);
   
                 out.println("HORIZONTAL DILUTION POSITION: =" +""+res[8]);
                ilr.save_tofile("HORIZONTAL DILUTION POSITION: =" +""+res[8]);
 
                 out.println("ATENNAE ALTITUDE: =" +""+res[9]+""+res[10]);
                ilr.save_tofile("ATENNAE ALTITUDE: =" +""+res[9]+""+res[10]);
  
                 out.println("GEOIDAL SEPERATION: =" +""+res[11]+""+res[12]);
                ilr.save_tofile("GEOIDAL SEPERATION: =" +""+res[11]+""+res[12]);
  
                 out.println("AGE SINCE LAST UPDATE FROM DIFF: =" +""+res[13]+" seconds");
                ilr.save_tofile("AGE SINCE LAST UPDATE FROM DIFF: =" +""+res[13]+" seconds");
     
                 out.println("DIFF REF. STATION ID: =" +""+res[14]);
                 ilr.save_tofile("DIFF REF. STATION ID: =" +""+res[14]);
       
                 out.println("POSINTION: =(" +""+res[2]+""+res[3]+","+res[4]+""+res[5]+")");
                 ilr.save_tofile("POSINTION: =(" +""+res[2]+""+res[3]+","+res[4]+""+res[5]+")");
          
                 out.println("#############################END OF RESULT##################################");
                 out.println("::PROCESSING COMPLETE INPUT NMEA STRING/PASTE TO SIMULATE LARGE INPUT\n\r\n\r");
            ilr.save_tofile("#############################END OF RESULT##################################\n\r\n\r");
      
                 out.flush();  
                }
                else
                {
                 out.println("Not expected data \n\r\n\r");
            out.flush();   
                }
                
                   /* Thread uzi = new Thread(new MSGprocessingThread(this, liner));
                    uzi.setDaemon(false);
                    uzi.start();*/
                
            }
        }
        catch(Exception em)
        {
            System.out.println("Error2: Cannot read from socket: " + em.getMessage());
            em.printStackTrace();
        }
        finally
        {
            System.out.println("APP Station Threads active before : " + handlers.size());
            synchronized(handlers) 
            {
                handlers.removeElement(this);
                connectedclients.removeElement(socket.getInetAddress().getHostAddress());
                System.out.println("APP Station Threads active after : " + handlers.size());
            }
            System.out.println("Client disconnected from address : " + socket.getInetAddress().getHostAddress() + " at port: " + socket.getPort());
             }
    }  
    public void activelook()
    {
        java.util.Date timenow = new java.util.Date();
        long last = lastMessageTime.getTime();
        long now = timenow.getTime();
        long timediffmillisec = now - last;
        //System.out.println("Idleness Check: Time diff millis: " + timediffmillisec);
        long timediffsec = (timediffmillisec/1000);
        timediffsec = Math.abs(timediffsec);
        //System.out.println("Idleness Check: Time diff seconds: " + timediffsec);
        long timediffmin = (timediffsec/60);
        //System.out.println("Idleness Check: Time diff minutes: " + timediffmin);
        if(timediffmin >= connectionGracePeriod + 1)
        {
            //This connection has exceeded the allowed idleness time and will be terminated
            System.out.println("Terminating a connection for being idle");
            
            states = false;
            out.println("Connection too idle. Now terminating.\n\r\n\r");
            out.flush();
            try 
            {
                socket.close();
                in.close();
                socket.close();
		out.close();
                socket.close();
                in2.close();
                socket.close();
		out2.close();
		socket.close();
            } 
            catch(Exception ie) 
            {
                //keep quiet
            }
            finally 
            {
                //This should only run once
                if(notremoved)
                {
                    synchronized(handlers) 
                    {
                        System.out.println("Clients connected before this: " + handlers.size());
                        handlers.removeElement(this);
                        connectedclients.removeElement(socket.getInetAddress().getHostAddress());
                        System.out.println("Client Just disconnected: Clients connected after this: " + handlers.size());
                        }
                    notremoved = false;
                }
	    }
        }
    }
public boolean checkIfAlreadyConnected(String IP)
    {
    return false;
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
                readData3();
            }
        
       }
    
}
