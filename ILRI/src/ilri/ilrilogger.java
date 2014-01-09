/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ilri;

/**
 *
 * @author luther
 */
import java.io.*;
import java.text.*;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class ilrilogger extends FileOutputStream
{
    //create another outputstream
    public ByteArrayOutputStream baos = new ByteArrayOutputStream();
    public PrintStream outer = new PrintStream(baos, true);
    public FileOutputStream fos; 
    public PrintStream inner;
    public boolean logtofile = true;
    public boolean logtobyte = true;
    public Log log = LogFactory.getLog("x.y");
    
    public ilrilogger(File file) throws FileNotFoundException
    {
        super(file, true);
        fos = new FileOutputStream(file, true);
        inner = new PrintStream(fos, true);
        println("\n\rSYSTEM INITIALIZED\n\r");
    }
    
    public ilrilogger(String name) throws FileNotFoundException
    {
        
        super(name, true);
       // getMemoDetails();
        fos = new FileOutputStream(name, true);
        inner = new PrintStream(fos, true);
       
    }
            
    public ilrilogger(String name, boolean append) throws FileNotFoundException
    {
        super(name, append);
        fos = new FileOutputStream(name, append);
        inner = new PrintStream(fos, true);
        
    }
            
    public ilrilogger(File file, boolean append) throws FileNotFoundException
    {
        super(file, append);
        fos = new FileOutputStream(file, append);
        inner = new PrintStream(fos, true);
        
    }
            
    public ilrilogger(FileDescriptor fdObj)
    {
        super(fdObj);
        fos = new FileOutputStream(fdObj);
        inner = new PrintStream(fos, true);
        
    }
    
    public ilrilogger()
    {
        super(new FileDescriptor());
        println("\n\rSYSTEM INITIALIZED\n\r");
    }
    
    public void reset()
    {
        baos.reset();
    }
  //this checks memory allocated everytime we call the function.  
    public String getMemoDetails()
    {
        String ret = "";
        Runtime r = Runtime.getRuntime();

        // amount of unallocated memory
        long free = r.freeMemory();

        // total amount of memory available allocated and unallocated.
        long total = r.totalMemory();

        // total amount of allocated memory
        long inuse = r.totalMemory() - r.freeMemory();

        // max memory JVM will attempt to use
        long max = r.maxMemory();
        
        if(free <= 1048576)
        {
            // suggest now would be a good time for garbage collection
            System.gc();
        }
        ret = "||System Memory: Total= " + total + " Free= " + free + " Max= " + max + " InUse=" + inuse + " ||";
        return(ret);
    }
    
    public void println(String x)
    {
        try
        {
            java.util.Date myTodayguf = new java.util.Date();
            SimpleDateFormat myTodayguftt = new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss");
            String etime = myTodayguftt.format(myTodayguf);
            String mem = getMemoDetails();
            x = x;
            //checking memory would make the code consume more memory remove this.
            //Neccessesary for enterprise application.
            if(logtobyte)
            {
                if(baos.size() >= 999999999)
                {
                    baos.reset();
                }
                outer.println(x);
                //outer.flush();
            }
            if(logtofile)
            {
                //inner.println(x);
                //inner.flush();
                log.debug(x);
            }
            System.out.println("Logging: " + x);
        }
        catch(Exception emm)
        {
            System.out.println("Error trying to log: " + emm.getMessage());
            emm.printStackTrace();
        }
    }
   //this would enble monitoring by prot if implemented in time 
   public String getLastLine(BufferedReader in) 
    { 
        String line=null, tmp;
        int mon = 0;
        try 
        {
            while ((tmp = in.readLine()) != null)
            {
                line = tmp ;
                mon++;
            }
            if(mon > 100)
            {
                //Reset the output buffer: let hope we are not writting into it
                baos.reset();
            }
        }
        catch (IOException e) 
        {
            //do nothing
        } 
        return line ;
    }
    
    public String dogetlastline()
    {
        String let = "";
        let = getLastLine(new BufferedReader(new InputStreamReader(new ByteArrayInputStream(baos.toByteArray()))));
        return(let);
    }
}
