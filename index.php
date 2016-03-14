<?php

$dtb = new Database("bonjour1","bonjour-test.cdi0xcvkc5hp.eu-west-1.rds.amazonaws.com","root","bjr60074","test");

$data = $dtb->select();

$json = json_encode($data);
echo isset($_GET['callback'])
    ? "{$_GET['callback']}($json)"
    : $json;

class Database
{
    public $dbname;
    public $host;
    public $user;
    public $password;
    public $db, $request;

    public function __construct($dbname, $host, $user, $password, $tablecontent){

        $this->dbname=$dbname;
        $this->host=$host;
        $this->user=$user;
        $this->password=$password;
        $this->tablecontent =$tablecontent;
    }

    function getDbConnection(){
		
        $bdd = new PDO('mysql:dbname='.$this->dbname.';host='.$this->host.'', $this->user, $this->password);
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $bdd;
    }

    public function select() {

        try {
            // Get the db connection
            $this->db = $this->getDbConnection();
            try{               
                // Get all entries
                $sql = 'SELECT * FROM '.$this->tablecontent;
                $this->request = $this->db->prepare($sql);
                $this->request->execute();
                $result = $this->request->fetchAll(PDO::FETCH_ASSOC);

                return $this->end($result);

            }catch (PDOException $e) {
                $return = array(
                    "error" => array(
                        "type" => "db select",
                        "data" => $e->getMessage()
                    )
                );
                return $this->end($return);
            }
        }catch (PDOException $e) {
            $return = array(
                "error" => array(
                    "type" => "db select",
                    "data" => $e->getMessage()
                )
            );
            return $this->end($return);
        }
    }

    function end($msg) {
        $this->request->closeCursor();
        unset($this->request);
        unset($this->db);
        return $msg;
    }
}

?>