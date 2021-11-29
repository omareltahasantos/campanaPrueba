<?php

namespace App\Controller;
use App\Entity\User;
use App\Entity\UserData;
use App\Entity\Vivienda;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\Length;
use \Glooby\Doctrine\QueryBuilder\QueryBuilder;

use Symfony\Component\Validator\Constraints\DateTimeInterface;
class UserController extends AbstractController
{
    /**
     * @Route("/{reactRouting}", name="home", defaults={"reactRouting": null})
     */
    public function index(): Response
    {
        return $this->render('user/index.html.twig', [
            'controller_name' => 'UserController',
        ]);
    }
    /**
     * @Route("/api/newUser", name="new_user")
     */

     public function create(Request $request){

        $email = $request->get('email');
        $password = $request->get('password');

        
        $emailToString = strval($email);
        $emailparseado = trim($emailToString,'"');

        $passwordToString =  strval($password);
        $passwordparseada =  trim($passwordToString,'"');

        $entityManager = $this->getDoctrine()->getManager();

        $user = new User();
        $user->setEmail($emailparseado);
        $user->setPassword($passwordparseada);
        $user->setRoles(array('ROLE_USER'));
        $entityManager->persist($user);
        $entityManager->flush();
        // actually executes the queries (i.e. the INSERT query)

        if ($user->getId()) {
            return new Response(json_encode(array('error' => 'null')));

        }else {
            return new Response(json_encode(array('error' => 'No se ha podido añadir el usuario')));

        }

    
     }

      /**
     * @Route("/api/updateUser", name="updateUser")
     */

    public function update(Request $request){

        $email = $request->get('email');
        $password = $request->get('password');
        $id = $request->get('id');

        //return new Response('Este es el id que me has enviado '. $id);

        
        $emailToString = strval($email);
        $emailparseado = trim($emailToString,'"');

        $passwordToString =  strval($password);
        $passwordparseada =  trim($passwordToString,'"');

        $entityManager = $this->getDoctrine()->getManager();

        $user = $entityManager->getRepository(User::class)->find($id);

        $user->setEmail($emailparseado);
        $user->setPassword($passwordparseada);

        $entityManager->flush();

        //return new Response(gettype($user->getId()) . ' ' . gettype($id));

        
        if ($user->getId() == $id) {
            

            $viviendaChanged = $entityManager->getRepository(User::class)->find($user->getId());

            return new Response(json_encode(array(
                'error' => 'null',
                'id' => $viviendaChanged->getId(),
                'email' => $viviendaChanged->getEmail(),
                'password' => $viviendaChanged->getPassword(),
                'error' => 'null'
        )));

        }else {
            return new Response(json_encode(array('error' => 'No se ha podido editar el usuario')));

        }

    
     }

     

   
    /**
     * @Route("/api/checkifUserExists", name="check_user")
     */
    public function checkUserExists(Request $request) {
       
        $email = $request->get('email');
        $password = $request->get('password');

        
        $emailToString = strval($email);
        $emailparseado = trim($emailToString,'"');

        $passwordToString =  strval($password);
        $passwordparseada =  trim($passwordToString,'"');


        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
      
        for ($i = 0; $i < 30; $i++) {
            $index = rand(0, strlen($characters) - 1);
            $randomString .= $characters[$index];
        }

        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT u FROM App\Entity\User u WHERE u.email = :email AND u.password = :password' );
        $query->setParameters(array(
            'email' => $emailparseado,
            'password' => $passwordparseada));
        
        
        if ($users = $query->getResult()) {
            foreach ($users as $user) {
                return new Response(json_encode(array(
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'password' => $user->getPassword(),
                    'roles' => json_encode($user->getRoles()),
                    'token' => $randomString,
                    'error' => 'null'
                )));
    
            }
        }else {
            return new Response(json_encode(array(
                'error' => 'El email y/o contraseña no són correctos!'
            )));
        }
       


       
        
    }

     /**
     * @Route("/api/UsersList", name="getUsersList")
     */

    public function getData(){

        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT u FROM App\Entity\User u');
        
        $arrayResponse =[];
        


        if ($users = $query->getResult()) {
            foreach ($users as $user) {

               array_push($arrayResponse, array(
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'password' => $user->getPassword(),
                    'roles' => json_encode($user->getRoles())
               ));

                


    
            }

            return new Response(json_encode($arrayResponse));

        }
    }


    //Funciones para API de la entidad Vivienda

    //Listar viviendas
    /**
     * @Route("/api/Viviendas", name="getHousing")
     */
    public function getHousing(){

        $formato = 'Y-m-d H:i:s';
        
        

        //$fecha = DateTime::createFromFormat($formato, '2009-02-15 15:16:17');
        //echo "Formato: $formato; " . $fecha->format('Y-m-d H:i:s') . "\n";

        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT v FROM App\Entity\Vivienda v ORDER BY v.id DESC')->setMaxResults(10);
        
        $arrayResponse =[];
        


        if ($viviendas = $query->getResult()) {
            foreach ($viviendas as $vivienda) {

               array_push($arrayResponse, array(
                    'id' => $vivienda->getId(),
                    'contrato' => $vivienda->getContrato(),
                    'titular' => $vivienda->getTitular(),
                    'cp' => $vivienda->getCp(),
                    'municipio' => $vivienda->getMunicipio(),
                    'localidad' => $vivienda->getLocalidad(),
                    'tipo_via' => $vivienda->getTipoVia(),
                    'nombre_via' => $vivienda->getNombreVia(),
                    'num_portal' => $vivienda->getNumPortal(),
                    'bloque' => $vivienda->getBloque(),
                    'escalera' => $vivienda->getEscalera(),
                    'piso' => $vivienda->getPiso(),
                    'puerta' => $vivienda->getPuerta(),
                    'observaciones_direccion' => $vivienda->getObservacionesDireccion(),
                    'telefono1' => $vivienda->getTelefono1(),
                    'telefono2' => $vivienda->getTelefono2(),
                    'telefono3' => $vivienda->getTelefono3(),
                    'telefono4' => $vivienda->getTelefono4(),
                    'complemento1' => $vivienda->getComplemento1(),
                    'complemento2' => $vivienda->getComplemento2(),
                    'uso_residuos' => $vivienda->getUsoResiduos(),
                    'campaña_anterior' => $vivienda->getCampañaAnterior(),
                    'campaña_actual' => $vivienda->getCampañaActual(),
                    'primera_visita' => $vivienda->getPrimeraVisita(),
                    'segunda_visita' => $vivienda->getSegundaVisita(),
                    'fecha_visita' =>  $vivienda->getFechaVisita(),
                    'observaciones' => $vivienda->getObservaciones(),
                ));

                


    
            }

            return new Response(json_encode($arrayResponse));

        }
    }

    //Actualizar viviendas
     /**
     * @Route("/api/updateVivienda", name="updateVivienda")
     */

    public function updateVivienda(Request $request){
        $roleAdmin = trim($request->get('roleAdmin'), '"');
        $id = $request->get('id');
        $titular = $request->get('titular');
        $contrato = $request->get('contrato');
        $cp = $request->get('cp');
        $municipio = $request->get('municipio');
        $localidad= $request->get('localidad');
        $tipoVia= $request->get('tipoVia');
        $nombreVia= $request->get('nombreVia');
        $numPortal= $request->get('numPortal');
        $bloque= $request->get('bloque');
        $escalera= $request->get('escalera');
        $piso= $request->get('piso');
        $puerta= $request->get('puerta');
        $observacionesDireccion = $request->get('observacion_direccion');
        $telefono1= $request->get('tel1');
        $telefono2= $request->get('tel2');
        $telefono3= $request->get('tel3');
        $telefono4= $request->get('tel4');
        $complemento1= $request->get('complemento1');
        $complemento2= $request->get('complemento2');
        $usoResiduos= $request->get('usoResiduos');
        $campañaAnterior= $request->get('campañaAnterior');
        $campañaActual= $request->get('campañaActual');
        $primeraVisita= trim($request->get('primeraVisita'), '"');
        $segundaVisita= $request->get('segundaVisita');
        $observaciones= $request->get('observaciones');

        
        //Actualizando los valores en la BD
        $entityManager = $this->getDoctrine()->getManager();

        
        $vivienda = $entityManager->getRepository(Vivienda::class)->find($id);

        $vivienda->setTitular(trim($titular, '"'));
        $vivienda->setContrato($contrato);
        $vivienda->setCp($cp);
        $vivienda->setMunicipio(trim($municipio , '"'));
        $vivienda->setLocalidad(trim($localidad, '"'));
        $vivienda->setTipoVia(trim($tipoVia, '"'));
        $vivienda->setNombreVia(trim($nombreVia, '"'));
        $vivienda->setNumPortal(trim($numPortal,'"'));
        $vivienda->setBloque($bloque);
        $vivienda->setEscalera(trim($escalera, '"'));
        $vivienda->setPiso(trim($piso, '"'));
        $vivienda->setPuerta(trim($puerta, '"'));
        $vivienda->setObservacionesDireccion(trim($observacionesDireccion, '"'));
        $vivienda->setTelefono1(trim($telefono1, '"'));
        $vivienda->setTelefono2(trim($telefono2, '"'));
        $vivienda->setTelefono3(trim($telefono3, '"'));
        $vivienda->setTelefono4(trim($telefono4, '"'));
        $vivienda->setComplemento1(trim($complemento1, '"'));
        $vivienda->setComplemento2(trim($complemento2, '"'));
        $vivienda->setUsoResiduos(trim($usoResiduos, '"'));
        $vivienda->setCampañaAnterior(trim($campañaAnterior, '"'));
        $vivienda->setCampañaActual(trim($campañaActual, '"'));
        $vivienda->setPrimeraVisita($primeraVisita);


        if ($primeraVisita === 'abre puerta' || $primeraVisita === 'ilocalizable') {

            if ($roleAdmin === 'ROLE_ADMIN') {
                $vivienda->setFechaVisita(date("Y-m-d H:i:s"));
            }
        }

        $vivienda->setSegundaVisita(trim($segundaVisita, '"'));
        $vivienda->setObservaciones(trim($observaciones, '"'));


        $entityManager->flush();


        //return new Response(gettype($user->getId()) . ' ' . gettype($id));

        
        if ($vivienda->getId() == $id) {
            

            $viviendaChanged = $entityManager->getRepository(Vivienda::class)->find($vivienda->getId());

            return new Response(json_encode(array(
                'error' => 'null',
                'id' => $viviendaChanged->getId(),
                'contrato' => $viviendaChanged->getContrato(),
                'titular' => $viviendaChanged->getTitular(),
                'cp' => $viviendaChanged->getCp(),
                'municipio' => $viviendaChanged->getMunicipio(),
                'localidad' => $viviendaChanged->getLocalidad(),
                'tipo_via' => $viviendaChanged->getTipoVia(),
                'nombre_via' => $viviendaChanged->getNombreVia(),
                'num_portal' => $viviendaChanged->getNumPortal(),
                'bloque' => $viviendaChanged->getBloque(),
                'escalera' => $viviendaChanged->getEscalera(),
                'piso' => $viviendaChanged->getPiso(),
                'puerta' => $viviendaChanged->getPuerta(),
                'observaciones_direccion' => $viviendaChanged->getObservacionesDireccion(),
                'telefono1' => $viviendaChanged->getTelefono1(),
                'telefono2' => $viviendaChanged->getTelefono2(),
                'telefono3' => $viviendaChanged->getTelefono3(),
                'telefono4' => $viviendaChanged->getTelefono4(),
                'complemento1' => $viviendaChanged->getComplemento1(),
                'complemento2' => $viviendaChanged->getComplemento2(),
                'uso_residuos' => $viviendaChanged->getUsoResiduos(),
                'campana_anterior' => $viviendaChanged->getCampañaAnterior(),
                'campana_actual' => $viviendaChanged->getCampañaActual(),
                'primera_visita' => $viviendaChanged->getPrimeraVisita(),
                'segunda_visita' => $viviendaChanged->getSegundaVisita(),
                'fecha_visita' => $viviendaChanged->getFechaVisita(),
                'observaciones' => $viviendaChanged->getObservaciones(),
        )));

        }else {
            return new Response(json_encode(array('error' => 'No se ha podido editar los datos de la vivienda')));

        }
        
     }

     /**
     * @Route("/api/newHousing", name="newHousing")
     */
    public function newHousing(Request $request){

        $titular = trim($request->get('titular'), '"');
        $contrato = $request->get('contrato');
        $cp = $request->get('cp');
        $municipio = trim($request->get('municipio'), '"');
        $localidad= trim($request->get('localidad'), '"');
        $tipoVia= trim($request->get('tipoVia'), '"');
        $nombreVia= trim($request->get('nombreVia'), '"');
        $numPortal= trim($request->get('numPortal'), '"');
        $bloque= $request->get('bloque');
        $escalera= trim($request->get('escalera'), '"');
        $piso= trim($request->get('piso'), '"');
        $puerta= trim($request->get('puerta'), '"');
        $observacionesDireccion = trim($request->get('observacion_direccion'), '"');
        $telefono1= trim($request->get('tel1'), '"');
        $telefono2= trim($request->get('tel2'), '"');
        $telefono3= trim($request->get('tel3'), '"');
        $telefono4= trim($request->get('tel4'), '"');
        $complemento1= trim($request->get('complemento1'), '"');
        $complemento2= trim($request->get('complemento2'), '"');
        $usoResiduos= trim($request->get('usoResiduos'), '"');
        $campañaAnterior= trim($request->get('campañaAnterior'), '"');
        $campañaActual= trim($request->get('campañaActual'), '"');
        $primeraVisita= trim($request->get('primeraVisita'), '"');
        $segundaVisita= trim($request->get('segundaVisita'), '"');
        $observaciones= trim($request->get('observaciones'), '"');


        $entityManager = $this->getDoctrine()->getManager();
        ///HACER TODOS LOS SETS 
        $vivienda = new Vivienda();
        $vivienda->setTitular(trim($titular, '"'));
        $vivienda->setContrato($contrato);
        $vivienda->setCp($cp);
        $vivienda->setMunicipio(trim($municipio , '"'));
        $vivienda->setLocalidad(trim($localidad, '"'));
        $vivienda->setTipoVia(trim($tipoVia, '"'));
        $vivienda->setNombreVia(trim($nombreVia, '"'));
        $vivienda->setNumPortal(trim($numPortal,'"'));
        $vivienda->setBloque($bloque);
        $vivienda->setEscalera(trim($escalera, '"'));
        $vivienda->setPiso(trim($piso, '"'));
        $vivienda->setPuerta(trim($puerta, '"'));
        $vivienda->setObservacionesDireccion(trim($observacionesDireccion, '"'));
        $vivienda->setTelefono1(trim($telefono1, '"'));
        $vivienda->setTelefono2(trim($telefono2, '"'));
        $vivienda->setTelefono3(trim($telefono3, '"'));
        $vivienda->setTelefono4(trim($telefono4, '"'));
        $vivienda->setComplemento1(trim($complemento1, '"'));
        $vivienda->setComplemento2(trim($complemento2, '"'));
        $vivienda->setUsoResiduos(trim($usoResiduos, '"'));
        $vivienda->setCampañaAnterior(trim($campañaAnterior, '"'));
        $vivienda->setCampañaActual(trim($campañaActual, '"'));
        $vivienda->setPrimeraVisita(trim($primeraVisita, '"'));
        $vivienda->setSegundaVisita(trim($segundaVisita, '"'));
        $vivienda->setObservaciones(trim($observaciones, '"'));
        //$vivienda->setFechaVisita(date("Y-m-d H:i:s"));
        $entityManager->persist($vivienda);
        $entityManager->flush();
        // actually executes the queries (i.e. the INSERT query)

        if ($vivienda->getId()) {

            $entityManager = $this->getDoctrine()->getManager();
            $lastVivienda = $entityManager->getRepository(Vivienda::class)->find($vivienda->getId());
            return new Response(json_encode(array(
                'error' => 'null',
                'id' => $lastVivienda->getId(),
                'contrato' => $lastVivienda->getContrato(),
                'titular' => $lastVivienda->getTitular(),
                'cp' => $lastVivienda->getCp(),
                'municipio' => $lastVivienda->getMunicipio(),
                'localidad' => $lastVivienda->getLocalidad(),
                'tipo_via' => $lastVivienda->getTipoVia(),
                'nombre_via' => $lastVivienda->getNombreVia(),
                'num_portal' => $lastVivienda->getNumPortal(),
                'bloque' => $lastVivienda->getBloque(),
                'escalera' => $lastVivienda->getEscalera(),
                'piso' => $lastVivienda->getPiso(),
                'puerta' => $lastVivienda->getPuerta(),
                'observaciones_direccion' => $lastVivienda->getObservacionesDireccion(),
                'telefono1' => $lastVivienda->getTelefono1(),
                'telefono2' => $lastVivienda->getTelefono2(),
                'telefono3' => $lastVivienda->getTelefono3(),
                'telefono4' => $lastVivienda->getTelefono4(),
                'complemento1' => $lastVivienda->getComplemento1(),
                'complemento2' => $lastVivienda->getComplemento2(),
                'uso_residuos' => $lastVivienda->getUsoResiduos(),
                'campaña_anterior' => $lastVivienda->getCampañaAnterior(),
                'campaña_actual' => $lastVivienda->getCampañaActual(),
                'primera_visita' => $lastVivienda->getPrimeraVisita(),
                'segunda_visita' => $lastVivienda->getSegundaVisita(),
                
                'observaciones' => $lastVivienda->getObservaciones(),
            )));

        }else {
            return new Response(json_encode(array('error' => 'No se ha podido añadir el usuario')));

        }
    }

     /**
     * @Route("/api/NombreVias", name="getNombreVias")
     */
    
     public function nombreVias() {

        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT DISTINCT v.nombre_via FROM App\Entity\Vivienda v');

        $arrayResponse =[];

        $nombreVias = $query->getResult();

        return new Response(json_encode($nombreVias));

     }
     /**
     * @Route("/api/Contratos", name="getContratos")
     */
    
    public function contratos(Request $request) {

        $contrato = trim($request->get('contrato'), '"');

       // return new Response($contrato);


        $em = $this->getDoctrine()->getManager();
        $query = $em->createQuery('SELECT v.contrato FROM App\Entity\Vivienda v');


        $query = $em->createQuery("SELECT v.contrato FROM App\Entity\Vivienda v WHERE v.contrato like :contrato")
        ->setParameter('contrato', '%'.$contrato.'%');

        $arrayResponse =[];

        $contratos = $query->getResult();

        return new Response(json_encode($contratos));

     }

     /**
     * @Route("/api/search", name="search")
     */
    
    public function search(Request $request) {
    
        $usoResiduos = trim($request->get('usoResiduos'), '"');
        $tipoVia = trim($request->get('tipoVia'), '"');
        $localidades = trim($request->get('localidades'), '"');
        $campañaAnterior = trim($request->get('campañaAnterior'), '"');
        $contrato = $request->get('contrato');
        $numPortal = trim($request->get('numPortal'), '"');
        $bloque = $request->get('bloque');
        $escalera = trim($request->get('escalera'), '"');
        $piso = trim($request->get('piso'), '"');
        $puerta = trim($request->get('puerta'), '"');
        $municipio = trim($request->get('municipio'), '"');
        $nombreViaSelected = trim($request->get('nombreViaSelected'), '"');
        $arrayResponse =[];
        $em = $this->getDoctrine()->getManager();

        //return new Response($bloque);

        //Parte de query genérica
        $qb = $em->createQueryBuilder();
        $qb->select(
            'v.id, v.titular, v.contrato, v.cp, v.municipio, v.localidad, 
             v.tipo_via, v.nombre_via, v.num_portal, v.bloque, v.escalera, v.piso, v.puerta,
             v.observaciones_direccion, v.telefono1, v.telefono2, v.telefono3, v.telefono4, 
             v.complemento1, v.complemento2, v.uso_residuos, v.campana_anterior, v.campana_actual,
             v.primera_visita, v.segunda_visita, v.observaciones, v.fecha_visita ')
            ->from('App\Entity\Vivienda', 'v');
        //Comprobar cada campo si es null o no
            
        if ($usoResiduos !== '') {
            $qb->where(
                $qb->expr()->like('v.uso_residuos', ':usoresiduos')
            )->setParameter('usoresiduos','%'.$usoResiduos.'%');
        }
        if ($tipoVia !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.tipo_via' , ':tipovia')
            )->setParameter('tipovia', '%'.$tipoVia.'%');
        }
        if ($localidades !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.localidad' , ':localidad')
            )->setParameter('localidad', '%'.$localidades.'%');
        }
        if ($campañaAnterior) {
            $qb->andWhere(
                $qb->expr()->like('v.campana_anterior' , ':campanaAnterior')
            )->setParameter('campanaAnterior', '%'.$campañaAnterior.'%');
        }
        if ($contrato !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.contrato' , ':contrato')
            )->setParameter('contrato', $contrato.'%');
        }
        if ($numPortal !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.num_portal' , ':numportal')
            )->setParameter('numportal', $numPortal);
        }
        if ($bloque !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.bloque' , ':bloque')
            )->setParameter('bloque', $bloque);
        }
        if ($escalera !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.escalera' , ':escalera')
            )->setParameter('escalera', $escalera);
        }
        if ($piso !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.piso' , ':piso')
            )->setParameter('piso', $piso);
        }
        if ($puerta !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.puerta' , ':puerta')
            )->setParameter('puerta', $puerta);
        }
        if ($municipio !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.municipio' , ':municipio')
            )->setParameter('municipio', $municipio);
        }
        if ($nombreViaSelected !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.nombre_via' , ':nombrevia')
            )->setParameter('nombrevia', '%'.$nombreViaSelected.'%');
        }

        
       // $qb->expr()->count('v.id');
        $query = $qb->getQuery();
        $result = $query->getResult();
        return new Response(json_encode($query->setMaxResults(10)->getResult()));

     }

      /**
     * @Route("/api/countSearch", name="countSearch")
     */

    public function countSearch(Request $request) {
    
        $usoResiduos = trim($request->get('usoResiduos'), '"');
        $tipoVia = trim($request->get('tipoVia'), '"');
        $localidades = trim($request->get('localidades'), '"');
        $campañaAnterior = trim($request->get('campañaAnterior'), '"');
        $contrato = $request->get('contrato');
        $numPortal = trim($request->get('numPortal'), '"');
        $bloque = $request->get('bloque');
        $escalera = trim($request->get('escalera'), '"');
        $piso = trim($request->get('piso'), '"');
        $puerta = trim($request->get('puerta'), '"');
        $municipio = trim($request->get('municipio'), '"');
        $nombreViaSelected = trim($request->get('nombreViaSelected'), '"');
        $arrayResponse =[];
        $em = $this->getDoctrine()->getManager();

        //return new Response($bloque);

        //Parte de query genérica
        $qb = $em->createQueryBuilder();
        $qb->select('v.id')->from('App\Entity\Vivienda', 'v');
        //Comprobar cada campo si es null o no

        if ($usoResiduos !== '') {
            $qb->where(
                $qb->expr()->like('v.uso_residuos', ':usoresiduos')
            )->setParameter('usoresiduos','%'.$usoResiduos.'%');
        }
        if ($tipoVia !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.tipo_via' , ':tipovia')
            )->setParameter('tipovia', '%'.$tipoVia.'%');
        }
        if ($localidades !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.localidad' , ':localidad')
            )->setParameter('localidad', '%'.$localidades.'%');
        }
        if ($campañaAnterior) {
            $qb->andWhere(
                $qb->expr()->like('v.campana_anterior' , ':campanaAnterior')
            )->setParameter('campanaAnterior', '%'.$campañaAnterior.'%');
        }
        if ($contrato !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.contrato' , ':contrato')
            )->setParameter('contrato', $contrato.'%');
        }
        if ($numPortal !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.num_portal' , ':numportal')
            )->setParameter('numportal', $numPortal);
        }
        if ($bloque !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.bloque' , ':bloque')
            )->setParameter('bloque', $bloque);
        }
        if ($escalera !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.escalera' , ':escalera')
            )->setParameter('escalera', $escalera);
        }
        if ($piso !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.piso' , ':piso')
            )->setParameter('piso', $piso);
        }
        if ($puerta !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.puerta' , ':puerta')
            )->setParameter('puerta', $puerta);
        }
        if ($municipio !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.municipio' , ':municipio')
            )->setParameter('municipio', $municipio);
        }
        if ($nombreViaSelected !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.nombre_via' , ':nombrevia')
            )->setParameter('nombrevia', '%'.$nombreViaSelected.'%');
        }

        
       // $qb->expr()->count('v.id');
        $query = $qb->getQuery();
        return new Response(json_encode($query->getResult()));

     }

     /**
     * @Route("/api/nextSearch", name="nextSearch")
     */
    public function nextResults(Request $request) {
    
        $usoResiduos = trim($request->get('usoResiduos'), '"');
        $tipoVia = trim($request->get('tipoVia'), '"');
        $localidades = trim($request->get('localidades'), '"');
        $campañaAnterior = trim($request->get('campañaAnterior'), '"');
        $contrato = $request->get('contrato');
        $numPortal = trim($request->get('numPortal'), '"');
        $bloque = $request->get('bloque');
        $escalera = trim($request->get('escalera'), '"');
        $piso = trim($request->get('piso'), '"');
        $puerta = trim($request->get('puerta'), '"');
        $municipio = trim($request->get('municipio'), '"');
        $nombreViaSelected = trim($request->get('nombreViaSelected'), '"');
        $rowsPerPage = $request->get('rowsPerPage');
        $secondParamNextResults = $request->get('secondParamNextResults');
        $arrayResponse =[];
        $em = $this->getDoctrine()->getManager();

        //return new Response($bloque);

        //Parte de query genérica
        $qb = $em->createQueryBuilder();
        $qb->select(
            'v.id, v.titular, v.contrato, v.cp, v.municipio, v.localidad, 
             v.tipo_via, v.nombre_via, v.num_portal, v.bloque, v.escalera, v.piso, v.puerta,
             v.observaciones_direccion, v.telefono1, v.telefono2, v.telefono3, v.telefono4, 
             v.complemento1, v.complemento2, v.uso_residuos, v.campana_anterior, v.campana_actual,
             v.primera_visita, v.segunda_visita, v.observaciones, v.fecha_visita ')
            ->from('App\Entity\Vivienda', 'v');
        //Comprobar cada campo si es null o no

        if ($usoResiduos !== '') {
            $qb->where(
                $qb->expr()->like('v.uso_residuos', ':usoresiduos')
            )->setParameter('usoresiduos','%'.$usoResiduos.'%');
        }
        if ($tipoVia !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.tipo_via' , ':tipovia')
            )->setParameter('tipovia', '%'.$tipoVia.'%');
        }
        if ($localidades !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.localidad' , ':localidad')
            )->setParameter('localidad', '%'.$localidades.'%');
        }
        if ($campañaAnterior) {
            $qb->andWhere(
                $qb->expr()->like('v.campana_anterior' , ':campanaAnterior')
            )->setParameter('campanaAnterior', '%'.$campañaAnterior.'%');
        }
        if ($contrato !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.contrato' , ':contrato')
            )->setParameter('contrato', $contrato.'%');
        }
        if ($numPortal !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.num_portal' , ':numportal')
            )->setParameter('numportal', $numPortal);
        }
        if ($bloque !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.bloque' , ':bloque')
            )->setParameter('bloque', $bloque);
        }
        if ($escalera !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.escalera' , ':escalera')
            )->setParameter('escalera', $escalera);
        }
        if ($piso !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.piso' , ':piso')
            )->setParameter('piso', $piso);
        }
        if ($puerta !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.puerta' , ':puerta')
            )->setParameter('puerta', $puerta);
        }
        if ($municipio !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.municipio' , ':municipio')
            )->setParameter('municipio', $municipio);
        }
        if ($nombreViaSelected !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.nombre_via' , ':nombrevia')
            )->setParameter('nombrevia', '%'.$nombreViaSelected.'%');
        }

        
       // $qb->expr()->count('v.id');
        $query = $qb->getQuery();
        $result = $query->setFirstResult( $secondParamNextResults )->setMaxResults( $rowsPerPage )->getResult();

        return new Response(json_encode($result));

     }
      /**
     * @Route("/api/prevSearch", name="prevSearch")
     */
    public function prevResults(Request $request) {
    
        $usoResiduos = trim($request->get('usoResiduos'), '"');
        $tipoVia = trim($request->get('tipoVia'), '"');
        $localidades = trim($request->get('localidades'), '"');
        $campañaAnterior = trim($request->get('campañaAnterior'), '"');
        $contrato = $request->get('contrato');
        $numPortal = trim($request->get('numPortal'), '"');
        $bloque = $request->get('bloque');
        $escalera = trim($request->get('escalera'), '"');
        $piso = trim($request->get('piso'), '"');
        $puerta = trim($request->get('puerta'), '"');
        $municipio = trim($request->get('municipio'), '"');
        $nombreViaSelected = trim($request->get('nombreViaSelected'), '"');
        $rowsPerPage = $request->get('rowsPerPage');
        $secondParamPrevResults = $request->get('secondParamPrevResults');
        $arrayResponse =[];
        $em = $this->getDoctrine()->getManager();

        //return new Response($bloque);

        //Parte de query genérica
        $qb = $em->createQueryBuilder();
        $qb->select(
            'v.id, v.titular, v.contrato, v.cp, v.municipio, v.localidad, 
             v.tipo_via, v.nombre_via, v.num_portal, v.bloque, v.escalera, v.piso, v.puerta,
             v.observaciones_direccion, v.telefono1, v.telefono2, v.telefono3, v.telefono4, 
             v.complemento1, v.complemento2, v.uso_residuos, v.campana_anterior, v.campana_actual,
             v.primera_visita, v.segunda_visita, v.observaciones, v.fecha_visita ')
            ->from('App\Entity\Vivienda', 'v');
        //Comprobar cada campo si es null o no

        if ($usoResiduos !== '') {
            $qb->where(
                $qb->expr()->like('v.uso_residuos', ':usoresiduos')
            )->setParameter('usoresiduos','%'.$usoResiduos.'%');
        }
        if ($tipoVia !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.tipo_via' , ':tipovia')
            )->setParameter('tipovia', '%'.$tipoVia.'%');
        }
        if ($localidades !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.localidad' , ':localidad')
            )->setParameter('localidad', '%'.$localidades.'%');
        }
        if ($campañaAnterior) {
            $qb->andWhere(
                $qb->expr()->like('v.campana_anterior' , ':campanaAnterior')
            )->setParameter('campanaAnterior', '%'.$campañaAnterior.'%');
        }
        if ($contrato !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.contrato' , ':contrato')
            )->setParameter('contrato', $contrato.'%');
        }
        if ($numPortal !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.num_portal' , ':numportal')
            )->setParameter('numportal', $numPortal);
        }
        if ($bloque !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.bloque' , ':bloque')
            )->setParameter('bloque', $bloque);
        }
        if ($escalera !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.escalera' , ':escalera')
            )->setParameter('escalera', $escalera);
        }
        if ($piso !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.piso' , ':piso')
            )->setParameter('piso', $piso);
        }
        if ($puerta !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.puerta' , ':puerta')
            )->setParameter('puerta', $puerta);
        }
        if ($municipio !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.municipio' , ':municipio')
            )->setParameter('municipio', $municipio);
        }
        if ($nombreViaSelected !== '') {
            $qb->andWhere(
                $qb->expr()->like('v.nombre_via' , ':nombrevia')
            )->setParameter('nombrevia', '%'.$nombreViaSelected.'%');
        }

        
       // $qb->expr()->count('v.id');
        $query = $qb->getQuery();
        $result = $query->setFirstResult( $secondParamPrevResults )->setMaxResults( $rowsPerPage )->getResult();

        return new Response(json_encode($result));

     }


    }


   
    

    

