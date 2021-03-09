const { Schema, model } = require("mongoose");

//TODO - refactor Player schema to have player account in user doc
const playerSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  raspSocketId: {
    type: String,
    default: null,
  },
  isClientConfigured: {
    type: Boolean,
    default: false
  },
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  loginAttempts: {
    type: Number,
    default: 0,
  },
  nextAttempt: {
    type: Date,
  },
  refreshToken: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  isPlaying: {
    type: Boolean,
    required: true,
    default: false,
  },
  ip: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  isPremium: {
    type: Boolean,
    default: 0,
  },
  playTime: {
    type: Number,
    default: 0,
  },
  friends: {
    type: Array,
    default: [],
  },
  gamePlan: {
    type: String,
  },
  achievements: {
    type: Array,
    default: [],
  },
  avatar: {
    url: {
      type: String
    },
    originalFilename: {
      type: String
    }
  },
  //data to save from desktop client
  clientConfig: {
    network: {
      tailscaleId: {
        type: String,
        default: null
      },
      zerotierId: {
        type: String,
        default: null
      },
      zerotierIp: {
        type: String,
        default: null
      },
      tailscaleIp: {
        type: String,
        default: null
      },
      clientZerotierIp: {
        type: String,
        default: null
      },
      clientTailscaleIp: {
        type: String,
        default: null
      }
    },
    xboxId: {
      type: String,
      default: null
    },
    xboxIp: {
      type: String,
      default: null
    },
    raspberryLocalIp: {
      type: String,
      default: null
    },
  },
});

playerSchema.loadClass(require("../Classes/Player"));

module.exports = model("Player", playerSchema, "Players");
