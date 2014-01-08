<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of loaddata
 *
 * @author User
 */
class Loaddata extends CI_Controller {
    //put your code here
    
     public function index()
	{

            $this->load->model("location");
            $data["query1"]=$this->location->Get_SPec();//Get_Machine()Get_SPec();
            //
            //$data["codes"]=  $this->location->get_ErrorMean($this->input->get());
            //$data["acard"]=$this->location->Get_Acard();
           // $data["time"]=$this->location->Get_last_log();
            
		$this->load->view('viewdata',$data);
	}
    
    
}

?>
