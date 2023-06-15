import React from "react"
import WindChat from "./lib/WindChat"

function App() {
  const [loading, setLoading] = React.useState(false);
  console.log("loading", loading);
  return (
    <div className={"dot-bg w-screen h-screen overflow-hidden " + ( loading ? 'move' : '' ) }>
      <div className="mx-32 mt-12 bg-white">
      <WindChat 
        apiKey={'fk...'}
        stream={true}
        containerClasses="border p-5 rounded-xl shadow-xl"
        listClasses="max-h-96 overflow-auto my-2 h-48"
        // searchableId="193678-87052c15-2e94-489f-a2cb-9e3a77a50621"
        // searchDatabaseName="精益副业"
        // avatarUser={<img src="https://cdn.discordapp.com/attachments/933565701162168371/1083498424097308692/iod_realistic_cartoon_black_and_white_face_line_art_minimalist__f95984c2-60a7-4f52-8d9e-82674b9d8c37.png" className="w-8 h-8 rounded-full" />}
        model={'gpt-3.5-turbo-0613'}
        onLoading={value => setLoading(value)}
      />
    </div>
    </div>
    
  )
}

export default App
