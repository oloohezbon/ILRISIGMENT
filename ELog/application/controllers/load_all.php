<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of load_all
 *
 * @author User
 */
class Load_all extends CI_Controller{
    //put your code here
    
     public function index()
	{
         
            $this->load->model("location");
            $data["query1"]=$this->location->Get_Machine();
            
		$this->load->view('viewdata',$data);
	}
    
}

?>
