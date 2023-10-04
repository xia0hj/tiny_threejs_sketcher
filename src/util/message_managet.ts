type ConsoleMsgType = 'log'|'warn'|'error'

class MessageManager {

  isDebugMode: boolean

  constructor(){
    this.isDebugMode = false
  }

  setDebugMode(isDebugMode: boolean){
    this.isDebugMode = isDebugMode
  }

  debug(type: ConsoleMsgType, ...message: any[]){
    if(this.isDebugMode){
      this.log(type, message)
    }
  }

  log(type: ConsoleMsgType, ...message: any[]){
    console[type](message)
  }
}

export const messageManager = new MessageManager()
