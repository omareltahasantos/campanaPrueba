<?php

namespace App\Entity;

use App\Repository\UserDataRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=UserDataRepository::class)
 */
class UserData
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $contrato;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $titular;

    /**
     * @ORM\Column(type="integer")
     */
    private $cp;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $municipio;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $localidad;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $tipo_via;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nombre_via;

    /**
     * @ORM\Column(type="integer")
     */
    private $num_portal;

    /**
     * @ORM\Column(type="integer")
     */
    private $bloque;

    /**
     * @ORM\Column(type="integer")
     */
    private $escalera;

    /**
     * @ORM\Column(type="integer")
     */
    private $piso;

    /**
     * @ORM\Column(type="integer")
     */
    private $puerta;

    /**
     * @ORM\Column(type="integer")
     */
    private $telefono_principal;

    /**
     * @ORM\Column(type="integer")
     */
    private $telefono_secundario;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $complemento1;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $complemento2;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $uso_residuos;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $campaña_anterior;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $resutado_visita;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $observaciones;

    /**
     * @ORM\Column(type="datetime")
     */
    private $date_created;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContrato(): ?string
    {
        return $this->contrato;
    }

    public function setContrato(string $contrato): self
    {
        $this->contrato = $contrato;

        return $this;
    }

    public function getTitular(): ?string
    {
        return $this->titular;
    }

    public function setTitular(string $titular): self
    {
        $this->titular = $titular;

        return $this;
    }

    public function getCp(): ?int
    {
        return $this->cp;
    }

    public function setCp(int $cp): self
    {
        $this->cp = $cp;

        return $this;
    }

    public function getMunicipio(): ?string
    {
        return $this->municipio;
    }

    public function setMunicipio(string $municipio): self
    {
        $this->municipio = $municipio;

        return $this;
    }

    public function getLocalidad(): ?string
    {
        return $this->localidad;
    }

    public function setLocalidad(string $localidad): self
    {
        $this->localidad = $localidad;

        return $this;
    }

    public function getTipoVia(): ?string
    {
        return $this->tipo_via;
    }

    public function setTipoVia(string $tipo_via): self
    {
        $this->tipo_via = $tipo_via;

        return $this;
    }

    public function getNombreVia(): ?string
    {
        return $this->nombre_via;
    }

    public function setNombreVia(string $nombre_via): self
    {
        $this->nombre_via = $nombre_via;

        return $this;
    }

    public function getNumPortal(): ?int
    {
        return $this->num_portal;
    }

    public function setNumPortal(int $num_portal): self
    {
        $this->num_portal = $num_portal;

        return $this;
    }

    public function getBloque(): ?int
    {
        return $this->bloque;
    }

    public function setBloque(int $bloque): self
    {
        $this->bloque = $bloque;

        return $this;
    }

    public function getEscalera(): ?int
    {
        return $this->escalera;
    }

    public function setEscalera(int $escalera): self
    {
        $this->escalera = $escalera;

        return $this;
    }

    public function getPiso(): ?int
    {
        return $this->piso;
    }

    public function setPiso(int $piso): self
    {
        $this->piso = $piso;

        return $this;
    }

    public function getPuerta(): ?int
    {
        return $this->puerta;
    }

    public function setPuerta(int $puerta): self
    {
        $this->puerta = $puerta;

        return $this;
    }

    public function getTelefonoPrincipal(): ?int
    {
        return $this->telefono_principal;
    }

    public function setTelefonoPrincipal(int $telefono_principal): self
    {
        $this->telefono_principal = $telefono_principal;

        return $this;
    }

    public function getTelefonoSecundario(): ?int
    {
        return $this->telefono_secundario;
    }

    public function setTelefonoSecundario(int $telefono_secundario): self
    {
        $this->telefono_secundario = $telefono_secundario;

        return $this;
    }

    public function getComplemento1(): ?string
    {
        return $this->complemento1;
    }

    public function setComplemento1(string $complemento1): self
    {
        $this->complemento1 = $complemento1;

        return $this;
    }

    public function getComplemento2(): ?string
    {
        return $this->complemento2;
    }

    public function setComplemento2(string $complemento2): self
    {
        $this->complemento2 = $complemento2;

        return $this;
    }

    public function getUsoResiduos(): ?string
    {
        return $this->uso_residuos;
    }

    public function setUsoResiduos(string $uso_residuos): self
    {
        $this->uso_residuos = $uso_residuos;

        return $this;
    }

    public function getCampañaAnterior(): ?string
    {
        return $this->campaña_anterior;
    }

    public function setCampañaAnterior(string $campaña_anterior): self
    {
        $this->campaña_anterior = $campaña_anterior;

        return $this;
    }

    public function getResutadoVisita(): ?string
    {
        return $this->resutado_visita;
    }

    public function setResutadoVisita(string $resutado_visita): self
    {
        $this->resutado_visita = $resutado_visita;

        return $this;
    }

    public function getObservaciones(): ?string
    {
        return $this->observaciones;
    }

    public function setObservaciones(string $observaciones): self
    {
        $this->observaciones = $observaciones;

        return $this;
    }

    public function getDateCreated(): ?\DateTimeInterface
    {
        return $this->date_created;
    }

    public function setDateCreated(\DateTimeInterface $date_created): self
    {
        $this->date_created = $date_created;

        return $this;
    }
}
