<?php
//date_default_timezone_set('Africa/Khartoum');
class Location extends CI_Model {
    
    function __construct()
    {
        
        parent::__construct();
    }  
    
    function GetALL_data(){
        $dates=date("Y-m-d");
           $this->db->select('*');
$this->db->from('watchdoglog');
//$this->db->limit(10);
$this->db->where('trans_date', $dates);
 
        $query = $this->db->get();

return $query->result();   
        
    }
  function Get_Mach(){
      $dates=date("Y-m-d");
           $this->db->select('*');
$this->db->from('watchdoglog');
//$this->db->limit(10);
$this->db->where('trans_date', $dates);
//$this->db->where('stationno','PND-008');
        $query = $this->db->get();

return $query->result();   
        
  }
function Get_SPec(){
    $datas=$this->input->get("id");
      $dates=date("Y-m-d");
           $this->db->select('*');
$this->db->from('stations');

$this->db->where('trans_date', $dates);
$this->db->where('station_name',$datas);
//$this->db->order_by("trans_time","desc");
$this->db->limit(1);

        $query = $this->db->get();

return $query->result();   
        
  }
  function Get_Machine()
  {
      //SELECT DISTINCT(stationno)
      $dates=date("Y-m-d");
           $this->db->select('*');
$this->db->from('stations');
//$this->db->limit(10);
$this->db->where('trans_date', $dates);
//$this->db->where('stationno','PND-008');
        $query = $this->db->get();

return $query->result(); 
  }
          function Login(){
    //$this->db->select('COUNT(*)');

//$this->db->limit(10);
      $this->load->helper('form');
        $name= $this->input->post("name");
        $pass= $this->input->post('pass');
$this->db->where('uname', $name);
$this->db->where('pass',$pass);
$this->db->from('monitor_users');
        $query = $this->db->count_all_results();

return $query;    
  }
  function Get_Printer($datas)
  {
           $dates=date("Y-m-d");
           $this->db->select('error_id');
$this->db->from('watchdoglog');
//$this->db->limit(10);
$this->db->where('trans_date', $dates);
$this->db->where('stationno',$datas);
$this->db->where("error_id BETWEEN 2000 AND 2999");
$this->db->order_by('trans_time','desc');
$this->db->limit(1);
        $query = $this->db->get();

return $query->result(); 
  }
  function Get_Acard($datas){
   $dates=date("Y-m-d");
           $this->db->select('error_id');
$this->db->from('watchdoglog');
//$this->db->limit(10);
$this->db->where('trans_date', $dates);
$this->db->where('stationno',$datas);
$this->db->where("error_id BETWEEN 1000 AND 1999");
$this->db->order_by('trans_time','desc');
$this->db->limit(1);
        $query = $this->db->get();

return $query->result();   
  }
  function  Get_coin($datas)
  {
  $dates=date("Y-m-d");
           $this->db->select('error_id');
$this->db->from('watchdoglog');
//$this->db->limit(10);
$this->db->where('trans_date', $dates);
$this->db->where('stationno',$datas);
$this->db->where("error_id BETWEEN 3000 AND 3999");
$this->db->order_by('trans_time','desc');
$this->db->limit(1);
        $query = $this->db->get();

return $query->result();     
  }
          function Get_last_log($datas)
  {
  $dates=date("Y-m-d");
           $this->db->select('time_stamp');
$this->db->from('stations');
//$this->db->limit(10);
$this->db->where('trans_date', $dates);
$this->db->where('station_name',$datas);

$this->db->order_by('time_stamp','desc');
$this->db->limit(1);
        $query = $this->db->get();
        foreach ($query->result() as $row)
        {
        return $row->time_stamp;    
        }
     
  }
  function get_ErrorMean($datas){
      $this->db->select('error_desc');
$this->db->from('error_codes');
//$this->db->limit(10);
$this->db->where('error_code', $datas);



$this->db->limit(1);
        $query = $this->db->get();
        foreach ($query->result() as $row)
        {
        return $row->error_desc;    
        }
  }
}

?>
