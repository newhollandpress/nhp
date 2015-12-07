<?php
namespace Publish\Block;

use Zend\View\Helper\AbstractHelper;
use Publish\BlockHelper as BlockHelper;

class Broadsheet extends BlockHelper
{
	public $view;
	public $output;
	public $results_top;
	public $results_left;
	public $emptyArray;
	public $broadsheet;
	public $name;
	public $position;
	public $items;
	public $containers;
	
	public function __construct($baseURI)
	{
	    parent::setBaseURI($baseURI);
	}
	public function fetch()
	{
		parent::fetch();
		$this->broadsheet = json_decode(parent::getSnapshot());
		$items = $this->broadsheet->broadsheet;
		$this->items = $items;
	}
	public function toHTML() {
		$this->fetch();
		$returnHTML = "<div>";
		$items = $this->items;
		foreach ($items as $container)
		{
		    $name = $container->name;
		    $top = $container->top;
		    $height = $container->height;
		    $left = $container->left;
		    $width = $container->width;
		    $container = new Container();
		    $container->setName($name);
		    $snapshot = $container->toHTML();
		    $returnHTML .= "<div ";
		    $returnHTML .= "style='top:";
		    $returnHTML .= $top;
		    $returnHTML .= "px;left:";
		    $returnHTML .= $left;
		    $returnHTML .= "px;width:";
		    $returnHTML .= $width;
		    $returnHTML .= "px;height:";
		    $returnHTML .= $height;
		    $returnHTML .= "px'>";
		    $returnHTML .= $name;
		    $returnHTML .= "<br/>";
		    $returnHTML .= $snapshot;
		    $returnHTML .= "</div>";
		}
		$returnHTML .= "</div>";
		return $returnHTML;
		return $this->view->partial('partial/broadsheet.xhtml');
	}
}
