<?php

namespace HelpdeskBundle\Repository;

use Doctrine\ORM\EntityRepository;

/**
* CategoriesRepository
*
* This class was generated by the Doctrine ORM. Add your own custom
* repository methods below.
*/
class CategoriesRepository extends EntityRepository
{
	/**
	* Server side processing function to get all categories
	*/
	public function getCategories($data){

		$complexResult = array();
		$draw = addslashes(htmlspecialchars($data['draw']));
		$columnsList = array('id','name','created_by', 'created_date', 'is_active');
		$limit = addslashes(htmlspecialchars($data['length']));
		$offset = addslashes(htmlspecialchars($data['start']));
		$search = ''.addslashes(htmlspecialchars($data['search']['value'])).'';
		$orderByColumn = addslashes(htmlspecialchars($data['order'][0]['column']));
		if(addslashes(htmlspecialchars($data['order'][0]['dir']))){
			$orderByDirection = $data['order'][0]['dir'];
		}
		if($draw == 1){
			$orderByDirection = 'DESC';
		}
		$nameSearch = (isset($data['name']))? addslashes(htmlspecialchars($data['name'])): false;
		$isActiveSearch = (isset($data['isActive']))? addslashes(htmlspecialchars($data['isActive'])): false;

		$where = ($nameSearch || $isActiveSearch || $search)? 'WHERE ': '';

		if($nameSearch && !($isActiveSearch)){
			$searchByColumnSql  = 'name LIKE "%'.$nameSearch.'%" ';
		}
		else if(!($nameSearch) && $isActiveSearch){
			$searchByColumnSql  = 'is_active="'.$isActiveSearch.'" ';
		}
		else if($nameSearch && $isActiveSearch){
			$searchByColumnSql  = 'name LIKE "%'.$nameSearch.'%" and is_active="'.$isActiveSearch.'"';
		}
		else {
			$searchByColumnSql = '';
		}

		if($search){
			$searchSql = ' name LIKE "%'.$search .'%" or created_by LIKE "%'.$search .'%" or created_date LIKE "%'.$search .'%" or id LIKE "%'.$search .'%"';
		}else{
			$searchSql = '';
		}

		$and = ($search && $searchByColumnSql)? 'and ': '';
		if($orderByColumn){
			$columnsList = array('id','name','created_by', 'created_date', 'is_active');
			$orderByColumn = $columnsList[$orderByColumn];
			$orderBySql = 'ORDER BY '. $orderByColumn.' '. $orderByDirection;
		}
		else{
			$orderByColumn = $columnsList[0];
			$orderBySql = 'ORDER BY '. $orderByColumn.' '. $orderByDirection;

		}

		$sql = 'SELECT * FROM categories '.$where .' '.$searchByColumnSql.' '.$and.' '. $searchSql.' '.$orderBySql .'  LIMIT '.$limit.' OFFSET '.$offset;
		$sqlLength = 'SELECT COUNT(*) AS recordsTotal, COUNT(*) AS recordsFiltered FROM categories '.$where .' '.$searchByColumnSql.''.$and.' '. $searchSql.' '.$orderBySql. '';

		$stmt = $this->getEntityManager()->getConnection();
		$result = $stmt->executeQuery($sql);
		$result = $result->fetchAll();
		$resultLength = $stmt->executeQuery($sqlLength);

		foreach($resultLength as $resultLengthData){
			$complexResult['recordsTotal'] = $resultLengthData['recordsTotal'];
			$complexResult['recordsFiltered'] = $resultLengthData['recordsFiltered'];
		}
		$complexResult['data'] = $result;

		return $complexResult;
		die;
	}

	/**
	* Get one category for update
	*/
	
	public function getOneCategory($id){

		$id = addslashes(htmlspecialchars($id));
		$sql = 'SELECT * FROM categories WHERE id='.$id ;
		$stmt = $this->getEntityManager()->getConnection();
		$result = $stmt->executeQuery($sql);
		$result = $result->fetchAll();
		$result = ($result)?$result: false;
		return $result;
	}
}
