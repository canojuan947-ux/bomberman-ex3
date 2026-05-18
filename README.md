# Bomberman EX3

Juego inspirado en Bomberman desarrollado para el examen 3.

## Características

- Movimiento del jugador
- Bombas y explosiones
- Enemigos inteligentes
- Sistema de niveles
- Colisiones
- Puntuación
- Interfaz gráfica

## Tecnologías usadas

- Python
- Pygame
- Docker
- AWS EC2

## Clonar el proyecto

```bash
git clone https://github.com/canojuan947-ux/bomberman-ex3.git
cd bomberman-ex3
```

## Ejecutar desde AWS

Actualizar paquetes:

```bash
sudo apt update && sudo apt upgrade -y
```

Instalar Docker:

```bash
sudo apt install docker.io -y
```

Iniciar Docker:

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

Construir la imagen:

```bash
sudo docker build -t bomberman .
```

Ejecutar el contenedor:

```bash
sudo docker run -it bomberman
```

## Controles

- W A S D → Movimiento
- ESPACIO → Colocar bomba

## Autor

Juan David Cano Villada
