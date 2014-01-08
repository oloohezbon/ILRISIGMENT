  <table>
                        
                
                        <?php
                        foreach ($query1 as $rows){
                        
            $time=$this->location->Get_last_log($rows->station_name);
          
                 $your_date = strtotime($time);
     $datediff = time() - $your_date;
     //echo floor($datediff/(60*60));
     
     $deco=floor($datediff/(60*60));
     $des=NULL;
     if($deco>=1)
     {
      $des='<b><font color="red">Offline!</font><b>';   
     }
     else
     {
     $des='<b><font color="green">Online!</font><b>';   
     }
                     echo '<tr><td>'.$rows->station_name.'</td><td>'.$time.'</td><td>'.$des.'</td>';   
                 /* foreach ($query as $row){
                      
                       
                        
                        //echo '<td>'.$row->error_id.'</td>';
                        if($row->error_id=2000)
                        {
                            echo '<td>OK</td>';
                        }
                        if($row->error_id==2002)
                        {
                            echo '<td>Printer Bezel is Open</td>';
                        }
                        if($row->error_id==2003)
                        {
                            echo '<td>Printer has no Paper</td>';
                        }
                        if($row->error_id==2004)
                        {
                            echo '<td>No paper in printer bezel</td>';
                        }
                        if($row->error_id==2005)
                        {
                            echo '<td>Printer Bezel Open, Paper Present</td>';
                        }
                        if($row->error_id==2006)
                        {
                            echo '<td>Printer Bezel closed, No Paper roll</td>';
                        }
                            if($row->error_id==2007)
                        {
                            echo '<td>Printer NOT Connected</td>';
                        }
                        if($row->error_id==2010)
                        {
                            echo '<td>Printer not replying</td>';
                        }
                  } 
                  foreach ($acard as $row){
                      
                       
                        
                        //echo '<td>'.$row->error_id.'</td>';
                        if($row->error_id=1000)
                        {
                            echo '<td>Acard OK</td>';
                        }
                        if($row->error_id==1001)
                        {
                            echo '<td>Acard Ping Error</td>';
                        }
                        if($row->error_id==1010)
                        {
                            echo '<td>Acard Not Replying</td>';
                        }
                        
                  }  
                   foreach ($coin as $row){
                      
                       
                        
                        //echo '<td>'.$row->error_id.'</td>';
                        if($row->error_id=3000)
                        {
                            echo '<td>coin OK</td>';
                        }
                        else{
                          echo '<td>Coin Error</td>';  
                        }
                        
                  }*/
                    echo '</tr>';
                    }
                        ?>
                    
                    </table>   
