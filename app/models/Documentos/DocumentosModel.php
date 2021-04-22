<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class DocumentosModel extends Model
{

	public function __construct()
	{
		parent::__construct();
	}
//Guarda proveedor

public function SaveDocumento($request_params)
{
	$estatus = 0;
	try {
		$Code = $request_params['CodDocumento'];
		$nomebreDocumento = $request_params["NomDocumento"];
		$conn = new mysqli(HOST, USER, PASSWORD);
		$tipoDocumento = $request_params["tipoDocumento"];


		$fileName = $_FILES['file']['name'];
		$fileSize = $_FILES['file']['size'];
		$fileType = $_FILES['file']['type'];
		$fileNameCmps = explode(".", $fileName);
		$fileExtension = strtolower(end($fileNameCmps));
		$file = mysqli_real_escape_string($conn, file_get_contents( $_FILES['file']['tmp_name']));

		$newFileName = $fileName;

		$sql = "INSERT INTO ctt_documents(doc_code,doc_name,doc_size,doc_document, doc_content_type,doc_type, dot_id)
					VALUES ('$Code', '$newFileName',  $fileSize, '$file', '$fileType', '$fileExtension', '$tipoDocumento')";

		$this->db->query($sql);
		$qry = "SELECT MAX(doc_id) AS id FROM ctt_documents;";
		$result = $this->db->query($qry);
		if ($row = $result->fetch_row()) {
			$lastid = trim($row[0]);
		}

		$estatus = $lastid;
	} catch (Exception $e) {
		$estatus = 0;
	}
	return $estatus;
}

// Optiene los Usuaios existentes
	public function GetDocumentos()
	{
		$qry = "SELECT doc.doc_id, doc.doc_code, doc.doc_name, doc.doc_type, doc.dot_id, td.dot_name 
				FROM ctt_documents as doc
				LEFT JOIN ctt_documents_type AS td ON td.dot_id = doc.dot_id";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("doc_id" =>$row[0],
						"doc_code" =>$row[1],
						"doc_name" =>$row[2],
						"doc_type" =>$row[3],
						"dot_id" =>$row[4],
						"dot_name" =>$row[5]);
			array_push($lista, $item);
		}
		return $lista;
	}

    public function GetDocumento($params)
	{
		$qry = "SELECT doc_id, doc_code, doc_name,doc_type, dot_id FROM ctt_documents WHERE doc_id = ".$params['id'].";";
		$result = $this->db->query($qry);
		if($row = $result->fetch_row()){
			$item = array("doc_id" =>$row[0],
			"doc_code" =>$row[1],
			"doc_name" =>$row[2],
			"doc_type" =>$row[3],
			"dot_id" =>$row[4]);
		}
		return $item;
	}

	public function GetTypeDocumento($params)
	{
		$qry = "SELECT dot_id, dot_name FROM ctt_documents_type WHERE dot_status = 1;";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("dot_id" =>$row[0],
			"dot_name" =>$row[1]);
			array_push($lista, $item);
		}
		return $lista;
	}


    public function ActualizaDocumento($request_params)
	{
        $estatus = 0;
			try {
		       if(isset($_FILES['file']['name'])){
					$Code = $request_params['CodDocumento'];
					$nomebreDocumento = $request_params["NomDocumento"];

					$conn = new mysqli(HOST, USER, PASSWORD);
			
					$fileName = $_FILES['file']['name'];
					$fileSize = $_FILES['file']['size'];
					$fileType = $_FILES['file']['type'];
					$fileNameCmps = explode(".", $fileName);
					$fileExtension = strtolower(end($fileNameCmps));
					$file = mysqli_real_escape_string($conn, file_get_contents( $_FILES['file']['tmp_name']));
			
					$newFileName = $fileName;

					$qry = "UPDATE ctt_documents
					SET doc_code = '".$request_params['CodDocumento']."'
					,doc_name = '".$request_params['NomDocumento']."'
					,dot_id = '".$request_params['tipoDocumento']."'
					,doc_size = $fileSize
					,doc_type = '$fileExtension'
					,doc_content_type =  '$fileType'
					,doc_document = '$file'
					WHERE doc_id = ".$request_params['idDocumento'].";";
					$this->db->query($qry);

					$estatus =  $request_params['idDocumento']; 

				}else{

					$qry = "UPDATE ctt_documents
					SET doc_code = '".$request_params['CodDocumento']."'
					,dot_id = '".$request_params['tipoDocumento']."'
					,doc_name = '".$request_params['NomDocumento']."'
					WHERE doc_id = ".$request_params['idDocumento'].";";
					$this->db->query($qry);
					$estatus =  $request_params['idDocumento']; 

				}			   
			} catch (Exception $e) {

				$estatus = 0;
			}
		return $estatus;
	}

    //borra proveedor
	public function DeleteDocumentos($params)
	{
        $estatus = 0;
        try {
            $qry = "DELETE FROM ctt_documents
                    WHERE doc_id in (".$params['IdDocumento'].")";
            $this->db->query($qry);
            $estatus = $qry;
        } catch (Exception $e) {
            $estatus = 0;
        }
		return $estatus;
	}

	public function verDocumento($params)
	{
		$qry = "SELECT doc_name, doc_type, doc_size, doc_content_type, doc_document FROM ctt_documents WHERE doc_id =  ".$params['id'].";";
		$result = $this->db->query($qry);
		if($row = $result->fetch_row()){
			$item = array("doc_name" =>$row[0],
			"doc_type" =>$row[1],
			"doc_size" =>$row[2],
			"doc_content_type" =>$row[3],
			"doc_document" =>base64_encode($row[4]));
		}
		return $item;
	}


}