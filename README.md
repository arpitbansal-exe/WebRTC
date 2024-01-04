
# WebRTC

**Welcome to the WebRTC Video Chat App repository!** This project leverages the power of WebRTC (Web Real-Time Communication) to facilitate seamless real-time video communication directly within web browsers.


## Tech Stack

**Frontend**

- **React:** The user interface is built using the React library, providing a modular and efficient component-based structure.
- **WebRTC API:** Harnessing the core functionalities of WebRTC, such as peer connection, getUserMedia for accessing camera and microphone, and handling real-time data streams.
- **Socket.io Client:** Facilitating real-time bidirectional communication between the client and the signaling server.

**Backend**

- **Node.js:** The signaling server, responsible for the initial handshake between peers, is built using Node.js for its asynchronous and event-driven architecture.

- **Socket.io:** Employed for WebSocket communication, ensuring seamless signaling between clients.
## Deployment

To deploy this project run

- **Frontend**
```bash
  cd client
  npm start
```
- **Backend**
```bash
  cd server
  npm run start
```




## WebRTC Workflow

- **Signaling Server Handshake:**
    The signaling server, located in the /server directory, facilitates the initial handshake between clients. It manages session initiation, offer and answer exchange, and ICE candidate negotiation.

- **Peer Connection:**
    Once the handshake is complete, the clients establish a direct peer connection using the WebRTC peer connection API. This direct connection handles the exchange of audio and video data without the need for ongoing server involvement.

- **ICE Framework:** The Interactive Connectivity Establishment (ICE) framework is employed to navigate network complexities, ensuring a robust connection even in challenging environments with firewalls and NAT.
## Demo
**Lobby Screen**: Please Enter any mail id and Room no you want to join.
![Lobby Screen](https://raw.githubusercontent.com/arpitbansal-exe/WebRTC/main/lobby.png)

1. Please Enter any mail id and Room no you want to join.
2. Click join
3. Open another tab or browser and do the same.
4. After joining from both, the screen wilshow connected.
5. Call the other user.
6. Click on Send Stream Button.


**Room**
![Room Screen](https://raw.githubusercontent.com/arpitbansal-exe/WebRTC/main/Room.png)

***And you are done! Happy Learning***


## Authors

- [@arpitbansal-exe](https://www.github.com/arpitbansal-exe)

