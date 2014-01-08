  <table>
                        <th>Eq. Name</th><th>Location</th><th>Last Log</th><th>Duration Since Last Log</th><th>Status Desc.</th><th>Voltage</th><th>Temp</th><th>Printer</th><th>Acard</th><th>Coin</th>
                
                        <?php
                        foreach ($query1 as $rows){
                        //$query=$this->location->Get_Printer($rows->stationno);//Get_Machine()Get_SPec();
            //$acard=$this->location->Get_Acard($rows->stationno);
            $time=$this->location->Get_last_log($rows->station_name);
            //$coin=$this->location->Get_coin($rows->stationno);
                 $your_date = strtotime($time);
     $datediff = time() - $your_date;
     //echo floor($datediff/(60*60));
     echo 'Machine '.$rows->station_name.' Last Log Data';
     $deco=  doubleval($datediff/(60*60));
     $des=NULL;
     if($deco>=1)
     {
      $des='<b><font color="red">Offline!</font><b>';   
     }
     else
     {
      $des='<b><font color="green">Online!</font><b>';   
     }
                     echo '<tr><td>'.$rows->station_name.'</td><td>later</td><td>'.$time.'</td><td>'.$deco.'</td><td>'.$des.'</td><td></td><td></td>';
   if($rows->printer_code==2000){
       echo '<td>Printer OK</td>';
   } 
   else if($rows->printer_code==2002){
       echo '<td>Bezel Open</td>';
   }
   else if($rows->printer_code==2003){
       echo '<td>No Paper</td>';
   }
   else if($rows->printer_code==2004){
       echo '<td>No Paper</td>';
   }
   else if($rows->printer_code==2005){
       echo '<td>Bezel Open Paper Present</td>';
   }
   else if($rows->printer_code==2006){
       echo '<td>No Paper roll</td>';
   }
   else if($rows->printer_code==2007){
       echo '<td>Printer Not Connected</td>';
   }
   else if($rows->printer_code==2010){
       echo '<td>Not Replying</td>';
   }
 else {
       echo '<td>No Last Log</td>';
   }
                   if($rows->coin_code==3000)
                   {
                       echo '<td>OK</td>';
                   }
                   else if($rows->coin_code==3001){
                       echo '<td>Unable to read Data</td>';
                   }
                   else if($rows->coin_code==3010){
                       echo '<td>Not Replying</td>';
                   }
 else {
     echo '<td>No Last Log</td>';
 }
   if($rows->acard_code==1000)
   {
       echo '<td>OK</td>';
   }
     else if($rows->acard_code==1001)   {
    echo '<td>Ping Error</td>';
     }                            
       else if($rows->acard_code==1010)   {
       echo '<td>Not replying</td>';  
     }                            
 else {
      echo '<td>No Last Log</td>';   
     }         
                    echo '</tr>';
                    }
                        ?>
                    
                    </table>   
