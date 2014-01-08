<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of loadmap
 *
 * @author User
 */
class Loadmap extends CI_Controller {
    //put your code here
    
    public function index()
	{
            //$this->load->model("location");
            //$data["query"]=$this->location->GetALL_data();
            
		$this->load->view('mapview');
	}
    
}

?>
