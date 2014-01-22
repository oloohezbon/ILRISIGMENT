/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package ilri;

import java.util.Vector;

/**
 *
 * @author luther
 */
public class ilrifunctions {
    
    public static int time=0;
    public static float latitude=0;
    public static float longitude=0;
    public static int numberofsatelites=0;
    public static double hdilution=0;
    public static double altitude=0;
    public static double heightgeod=0;
    public static double DGPSdiff=0;
    public static double DGPSid=0;
    
    public ilrifunctions()
    {
        
    }
      int GetInt (String s)
    {
        try {
            return Integer.parseInt (s);
        }
        catch (NumberFormatException e) {
            return 0;
        }
    }



    double GetDouble (String s)
    {
        try {
            return Double.parseDouble (s);
        }
        catch (NumberFormatException e) {
            return 0.0;
        }
    }
    float Getfloat (String s)
    {
        try {
            return Float.parseFloat(s);
        }
        catch (NumberFormatException e) {
            return 0;
        }
    }
    public static Vector Processed(String receiver)
    {
       
        String build;
        Vector holder = new Vector ();

        build = receiver.substring (0, receiver.lastIndexOf ('*'));
        build += ',';

        while (build.length () > 0) {
            holder.add (build.substring (0, build.indexOf (',')));
            build = build.substring (build.indexOf (',') + 1);
        }

        return holder;
        
        
    }
    public static String Gettime(int time)
    {
        int hrs, min, sec;
        String s = new String ();

        hrs = time / 10000;
        min = (time - (hrs * 10000)) / 100;
        sec = time - (hrs * 10000) - (min * 100);

        if (hrs < 10)
            s = "0";
        s += Integer.toString (hrs);
        s += ":";
        if (min < 10)
            s += "0";
        s += Integer.toString (min);
        s += ":";
        if (sec < 10)
            s += "0";
        s += Integer.toString (sec);

        return s;
    }
    public String GetFormattedlat(float lat,Vector held)
    {
     String lata=""+lat; 
     String converted="";
     if(lat>0)
     {
      converted=lata.substring(0, 2)+" deg "+lata.substring(2)+"' "+held.elementAt (3);
     }
     else{
      converted=lata.substring(0, 3)+" deg "+lata.substring(3)+"' "+held.elementAt (3);
       
     }
     return converted;
    }
    
    public String Getformattedlon(float lat,Vector held)
    {
        String lonconvert="";
      String longdt=""+lat;  
      if(lat>0)
      {
      lonconvert=longdt.substring(0, 2)+" deg "+longdt.substring(2)+"' "+held.elementAt (5);
      }
      else
      {
      lonconvert=longdt.substring(0, 3)+" deg "+longdt.substring(3)+"' "+held.elementAt (5);
          
      }
      return lonconvert;
    }
    public String DatatoSend(String v)
    {
        String data="";
        Vector held;
                held=Processed(v);
        if (((String) held.elementAt (0)).equals ("$GPGGA")) {

            time = (int) GetDouble((String) held.elementAt (1));

            latitude = Getfloat ((String) held.elementAt (2));
            longitude = Getfloat ((String) held.elementAt (4));
           // String lata=""+latitude;
            
             
            if (((String) held.elementAt (3)).equals ("S"))
                latitude = -latitude;

            
            if (((String) held.elementAt (5)).equals ("W"))
                longitude = -longitude;

            numberofsatelites = GetInt((String) held.elementAt (7));
            hdilution=GetDouble ((String) held.elementAt (8));
            altitude=GetDouble ((String) held.elementAt (9));
            
            heightgeod=GetDouble ((String) held.elementAt (11));
           DGPSdiff= GetDouble ((String) held.elementAt (13));
            DGPSid= GetDouble ((String) held.elementAt (14));
            //start putting the String in order.
            String converted=GetFormattedlat(latitude, held);
            String lonconvert=Getformattedlon(longitude, held);
             data+="Global Positioning System Fix Data\n\r";
            data+="Fix Taken at=\t"+Gettime(time)+ "UTC \n\rLatitude=\t "+converted+"\n\rLongitude=\t"+lonconvert+"\n\r Number Satellites=\t"+numberofsatelites;
            data+="\n\rHorizontal Dilution=\t"+hdilution+"\n\rAltitude=\t"+altitude+""+held.elementAt (10)+"\n\rHeight/geoid=\t"+heightgeod+""+held.elementAt (12)+" \n\rTime Since last update=\t"+DGPSdiff;
            data+="\n\rStation Id=\t"+DGPSid;
            data+="\n\rGEO Cords("+latitude+","+longitude+") at Time="+Gettime(time);

        }
        
        return data;
    }

}
