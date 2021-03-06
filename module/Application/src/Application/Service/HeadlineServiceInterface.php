<?php
//  http://framework.zend.com/manual/current/en/in-depth-guide/services-and-servicemanager.html

 namespace Application\Service;

 use Application\Entity\Headline;

interface HeadlineServiceInterface
{
     /**
      * Should return a set of all Wordage Items that we can iterate over. Single entries of the array are supposed to be
      * implementing \Application\Entity\Wordage
      *
      * @return array|Wordage[]
      */
     public function findAllHeadlines();

     /**
      * Should return a single Wordage
      *
      * @param  int $id Identifier of the Wordage that should be returned
      * @return Wordage
      */
     public function findHeadlines($id);
 }
