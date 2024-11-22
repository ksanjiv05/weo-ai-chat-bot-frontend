// import React from "react";

// function VoiceChat() {
//   return <div>VoiceChat</div>;
// }

// export default VoiceChat;
import "./VoiceChat.css";
import React from "react";
import Lottie from "react-lottie-player";
import lottieJson from "./voice.json";
import chatIcon from "./voice-message.png";
import noChatIcon from "./no-voice.png";
import useVoiceToText from "./hooks/useVoiceToText";
import { sendQuery } from "./api/api";
import { useTextToVoice } from "react-speakup";
import TextToSpeech from "./TextSpeech";

const VoiceChat = () => {
  const { startListening, stopListening, isSpeaking, transcript, reset } =
    useVoiceToText({
      continuous: true,
    });
  const [isListening, setIsListening] = React.useState(false);
  const [text, setText] = React.useState("");

  const handleStartListening = () => {
    startListening();
    setIsListening(true);
  };

  const handleStopListening = () => {
    stopListening();
    setIsListening(false);
  };

  const gettingResponse = async () => {
    const response = await sendQuery(transcript);
    console.log(response);
    setText(response);
    // speak()
    reset();
  };

  React.useEffect(() => {
    if (transcript) {
      console.log(transcript);
      gettingResponse();
    }
    // speak();
  }, [transcript]);

  return (
    <div className="container">
      {!isListening && (
        <div className="listing_container" onClick={handleStartListening}>
          <img src={chatIcon} width={64} alt="Voice Chat" />
        </div>
      )}

      {isListening && (
        <>
          <div className="listing_container">
            <Lottie
              loop
              animationData={lottieJson}
              play
              style={{ width: 150, height: 150 }}
            />
            {/* <div onClick={handleStopListening}> */}
            <img
              src={noChatIcon}
              width={64}
              alt="no Voice Chat"
              style={{ position: "absolute" }}
              onClick={handleStopListening}
            />
            {/* </div> */}
          </div>
        </>
      )}

      {/* <button onClick={speak}>Speak</button> */}
      {/* <div ref={ref}>
        The component also defines three event handlers for playing, pausing,
        and stopping the speech synthesis. When the Play/Resume button is
        clicked, the speak method of the SpeechSynthesis interface is called to
        start/resume the speech synthesis. Similarly, the pause and cancel
        methods are called when the Pause and Stop buttons are clicked,
        respectively.
      </div> */}
      <TextToSpeech text={text} />
    </div>
  );
};

export default VoiceChat;
