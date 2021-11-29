<?php

namespace App\Entity;

use App\Repository\ViviendaRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ViviendaRepository::class)
 */
class Vivienda
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $contrato;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $titular;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $cp;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $municipio;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $localidad;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $tipo_via;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $nombre_via;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $num_portal;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $bloque;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $escalera;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $piso;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $puerta;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $observaciones_direccion;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $telefono1;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $telefono2;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $telefono3;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $telefono4;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $complemento1;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $complemento2;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $tipo;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $estado;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $referencia;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $uso_abastecimiento;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $uso_residuos;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $campana_anterior;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $campana_actual;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $primera_visita;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $segunda_visita;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $observaciones;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $fecha_visita;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContrato(): ?int
    {
        return $this->contrato;
    }

    public function setContrato(?int $contrato): self
    {
        $this->contrato = $contrato;

        return $this;
    }

    public function getTitular(): ?string
    {
        return $this->titular;
    }

    public function setTitular(?string $titular): self
    {
        $this->titular = $titular;

        return $this;
    }

    public function getCp(): ?int
    {
        return $this->cp;
    }

    public function setCp(?int $cp): self
    {
        $this->cp = $cp;

        return $this;
    }

    public function getMunicipio(): ?string
    {
        return $this->municipio;
    }

    public function setMunicipio(?string $municipio): self
    {
        $this->municipio = $municipio;

        return $this;
    }

    public function getLocalidad(): ?string
    {
        return $this->localidad;
    }

    public function setLocalidad(?string $localidad): self
    {
        $this->localidad = $localidad;

        return $this;
    }

    public function getTipoVia(): ?string
    {
        return $this->tipo_via;
    }

    public function setTipoVia(?string $tipo_via): self
    {
        $this->tipo_via = $tipo_via;

        return $this;
    }

    public function getNombreVia(): ?string
    {
        return $this->nombre_via;
    }

    public function setNombreVia(?string $nombre_via): self
    {
        $this->nombre_via = $nombre_via;

        return $this;
    }

    public function getNumPortal(): ?string
    {
        return $this->num_portal;
    }

    public function setNumPortal(?string $num_portal): self
    {
        $this->num_portal = $num_portal;

        return $this;
    }

    public function getBloque(): ?int
    {
        return $this->bloque;
    }

    public function setBloque(?int $bloque): self
    {
        $this->bloque = $bloque;

        return $this;
    }

    public function getEscalera(): ?string
    {
        return $this->escalera;
    }

    public function setEscalera(?string $escalera): self
    {
        $this->escalera = $escalera;

        return $this;
    }

    public function getPiso(): ?string
    {
        return $this->piso;
    }

    public function setPiso(?string $piso): self
    {
        $this->piso = $piso;

        return $this;
    }

    public function getPuerta(): ?string
    {
        return $this->puerta;
    }

    public function setPuerta(?string $puerta): self
    {
        $this->puerta = $puerta;

        return $this;
    }

    public function getObservacionesDireccion(): ?string
    {
        return $this->observaciones_direccion;
    }

    public function setObservacionesDireccion(?string $observaciones_direccion): self
    {
        $this->observaciones_direccion = $observaciones_direccion;

        return $this;
    }

    public function getTelefono1(): ?string
    {
        return $this->telefono1;
    }

    public function setTelefono1(?string $telefono1): self
    {
        $this->telefono1 = $telefono1;

        return $this;
    }

    public function getTelefono2(): ?string
    {
        return $this->telefono2;
    }

    public function setTelefono2(?string $telefono2): self
    {
        $this->telefono2 = $telefono2;

        return $this;
    }

    public function getTelefono3(): ?string
    {
        return $this->telefono3;
    }

    public function setTelefono3(?string $telefono3): self
    {
        $this->telefono3 = $telefono3;

        return $this;
    }

    public function getTelefono4(): ?string
    {
        return $this->telefono4;
    }

    public function setTelefono4(?string $telefono4): self
    {
        $this->telefono4 = $telefono4;

        return $this;
    }

    public function getComplemento1(): ?string
    {
        return $this->complemento1;
    }

    public function setComplemento1(?string $complemento1): self
    {
        $this->complemento1 = $complemento1;

        return $this;
    }

    public function getComplemento2(): ?string
    {
        return $this->complemento2;
    }

    public function setComplemento2(?string $complemento2): self
    {
        $this->complemento2 = $complemento2;

        return $this;
    }

    public function getTipo(): ?string
    {
        return $this->tipo;
    }

    public function setTipo(?string $tipo): self
    {
        $this->tipo = $tipo;

        return $this;
    }

    public function getEstado(): ?string
    {
        return $this->estado;
    }

    public function setEstado(?string $estado): self
    {
        $this->estado = $estado;

        return $this;
    }

    public function getReferencia(): ?string
    {
        return $this->referencia;
    }

    public function setReferencia(?string $referencia): self
    {
        $this->referencia = $referencia;

        return $this;
    }

    public function getUsoAbastecimiento(): ?string
    {
        return $this->uso_abastecimiento;
    }

    public function setUsoAbastecimiento(?string $uso_abastecimiento): self
    {
        $this->uso_abastecimiento = $uso_abastecimiento;

        return $this;
    }

    public function getUsoResiduos(): ?string
    {
        return $this->uso_residuos;
    }

    public function setUsoResiduos(?string $uso_residuos): self
    {
        $this->uso_residuos = $uso_residuos;

        return $this;
    }

    public function getCampañaAnterior(): ?string
    {
        return $this->campana_anterior;
    }

    public function setCampañaAnterior(?string $campana_anterior): self
    {
        $this->campana_anterior = $campana_anterior;

        return $this;
    }

    public function getCampañaActual(): ?string
    {
        return $this->campana_actual;
    }

    public function setCampañaActual(?string $campana_actual): self
    {
        $this->campana_actual = $campana_actual;

        return $this;
    }

    public function getPrimeraVisita(): ?string
    {
        return $this->primera_visita;
    }

    public function setPrimeraVisita(?string $primera_visita): self
    {
        $this->primera_visita = $primera_visita;

        return $this;
    }

    public function getSegundaVisita(): ?string
    {
        return $this->segunda_visita;
    }

    public function setSegundaVisita(?string $segunda_visita): self
    {
        $this->segunda_visita = $segunda_visita;

        return $this;
    }

    public function getObservaciones(): ?string
    {
        return $this->observaciones;
    }

    public function setObservaciones(?string $observaciones): self
    {
        $this->observaciones = $observaciones;

        return $this;
    }

    public function getFechaVisita(): ?int
    {
        if ($this->fecha_visita !== null) {

            return $this->fecha_visita->getTimestamp();

        }else{
            return null;
        }
       
    }

    public function setFechaVisita($fecha_visita): self
    {
        //$this->fecha_visita = $fecha_visita;
        $this->fecha_visita = new \DateTime($fecha_visita);

        return $this;
    }
}
