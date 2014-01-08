<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of oath
 *
 * @author User
 */
class Oath extends CI_Controller {
    //put your code here
    
    
    public function index()
	{
		

        $this->load->library("session");
            $this->load->model("location");
            $data["query"]=$this->location->Get_Mach();
            $data["pnd"]=$this->location->Get_Machine();
            $datas=$this->location->Login();
            //echo $datas;
            $unames= $this->input->post("name");
            if($datas>0)
            {
                    $newdata = array(
                   'username'  => $unames,
                   
                   'logged_in' => TRUE
               );
$this->session->set_userdata($newdata);

              $this->load->view('dashboard',$data);  
              
            }
            else
            {
             $this->load->view('login_err',$data);   
            }
		//$this->load->view('viewdata',$data);
	}
    
}

?>
