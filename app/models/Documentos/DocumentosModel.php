<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class DocumentosModel extends Model
{

	public function __construct()
	{
		parent::__construct();
	}
//Guarda proveedor
	public function SaveDocumento($Nombre,$Code,$Size,$Type,$Content_type,$Documento_binario)
	{
        $estatus = 0;
			try {



/* 				$qry = "INSERT INTO ctt_documents(doc_code, doc_name, doc_type, doc_size, doc_content_type, doc_document)
				VALUES('$Code','$Nombre','$Type',$Size,'$Content_type','$Documento_binario')"; */
                $qry = "INSERT INTO ctt_documents(doc_code, doc_name, doc_type, doc_size, doc_content_type, doc_document)
						VALUES('$Code','$Nombre','$Type',$Size,'$Content_type','".real_escape_string(file_get_contents($_FILES['file']['tmp_name']))."')";
                $this->db->query($qry);	
				$estatus = 1;
			} catch (Exception $e) {
				$estatus = 0;
			}
		return $estatus;
	}
// Optiene los Usuaios existentes
	public function GetCategorias()
	{
		$qry = "SELECT cat_id, cat_name FROM ctt_categories WHERE cat_status = 1;";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("cat_id" =>$row[0],
						"cat_name" =>$row[1]);
			array_push($lista, $item);
		}
		return $lista;
	}

    public function GetCategoria($params)
	{
		$qry = "SELECT cat_id, cat_name FROM ctt_categories WHERE cat_id = ".$params['id'].";";
		$result = $this->db->query($qry);
		if($row = $result->fetch_row()){
			$item = array("cat_id" =>$row[0],
			"cat_name" =>$row[1]);
		}
		return $item;
	}


    public function ActualizaCategoria($params)
	{
        $estatus = 0;
			try {
                $qry = "UPDATE ctt_categories
                SET cat_name = '".$params['NomCategoria']."'
                WHERE cat_id = ".$params['IdCategoria'].";";

				$this->db->query($qry);	
				$estatus = 1;
			} catch (Exception $e) {
				$estatus = 0;
			}
		return $estatus;
	}

    //borra proveedor
	public function DeleteCategoria($params)
	{
        $estatus = 0;
        try {
            $qry = "UPDATE ctt_categories
                    SET cat_status = 0
                    WHERE cat_id in (".$params['IdCategoria'].");";
            $this->db->query($qry);
            $estatus = 1;
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
			"doc_document" =>$row[4]);
		}
		return $item;
	}


}