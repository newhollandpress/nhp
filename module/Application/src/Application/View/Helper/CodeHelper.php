<?php
namespace Application\View\Helper;

use Zend\View\Helper\AbstractHelper;
use Zend\Session\Container;
use Zend\ServiceManager\ServiceLocatorAwareInterface;  
use Zend\ServiceManager\ServiceLocatorInterface;
use Zend\View\Renderer\PhpRenderer;
use Zend\View\Model\ViewModel;
use Application\Service\PictureService as PictureService;  
 
class CodeHelper extends AbstractHelper implements ServiceLocatorAwareInterface
{
    protected static $state;
    protected $fileid;
    protected $codeObject;
    protected $code;
    protected $language;
    protected $title;
    protected $username;
    protected $id;
    protected $first_line;
    protected $last_line;

    /** 
     * Set the service locator. 
     * 
     * @ param ServiceLocatorInterface $serviceLocator 
     * @ return CustomHelper 
     */ 
    public function __construct()
    {
    }
    public function setServiceLocator(ServiceLocatorInterface $serviceLocator)  
    {  
        $this->serviceLocator = $serviceLocator;  
        return $this;  
    } 
    /** 
     * Get the service locator. 
     * 
     * @ return \Zend\ServiceManager\ServiceLocatorInterface 
     */  
    public function getServiceLocator()  
    {  
        return $this->serviceLocator;  
    }  
    public function setViewModel(ViewModel $viewmodel)
    {
        $this->viewmodel = $viewmodel;
    }
    public function getViewModel()
    {
        return $this->viewmodel;
    }
    public function setCodeObject($codeObject)
    {
        $this->codeObject = $codeObject;
        $this->first_line = $codeObject->getFirstLine();
        $this->last_line = $codeObject->getLastLine();
        $this->title = $codeObject->getTitle();
        $this->code = $codeObject->getCode();
        $this->language = $codeObject->getLanguage();
        $username = $this->getUsername();
    }
    public function setUsername($username)
    {
        $this->username = $username;
    }
    public function getUsername()
    {
        return $this->username;
    }
    public function setItemId($itemId)
    {
        $this->itemId = $itemId;
    }
    public function setRenderer($renderer)
    {
        $this->renderer = $renderer;
    }
    public function getRenderer()
    {
        return $this->renderer;
    }
    public function __invoke()
    {
        $viewRender = $this->getServiceLocator()->get('ViewRenderer');
    	
    	$view = $this->getViewModel();
		
	$view->bcolor = "#aa44aa";
	$view->language = $this->language;
	$view->title = $this->title;

	$view->setTemplate('items/codesample.phtml');
		
	return $viewRender->render($view);
    }
}
