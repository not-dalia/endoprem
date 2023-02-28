<template>
  <div
    :id="`form-el-${eldata.name}`"
    class="text-area"
    :class="{ subsection: eldata.subsection }"
    :value="value"
  >
    <div class="title-row">
      <label
        :for="eldata.name"
        class="title"
      >{{ eldata.question }}
        {{
          eldata.validationRules && eldata.validationRules.required ? "(*)" : ""
        }}</label>
      <HelpText
        :text="eldata.help"
        :name="eldata.name"
      />
    </div>
    <div
      v-if="eldata.description"
      class="desc"
    >
      {{ eldata.description }}
    </div>
    <div class="input-container">
      <textarea
        :id="eldata.name"
        v-model="textval"
        :name="eldata.name"
      />
      <div
        v-show="!audioSrc"
        v-if="eldata.canRecordAudio"
        :class="`mic ${isRecording ? 'recording' : ''}`"
        @click="toggleAudioRecorder"
      >
        <span
          v-if="!isRecording"
          class="record-title"
        >Record Audio</span>
        <span
          v-if="isRecording"
          class="record-title"
        >Recording... {{ getTimeInMinutes() }}</span>
        <img
          src="@/assets/microphone.svg"
          style="height: 1.3rem"
          alt="Record audio"
          title="Record audio"
        >
        <VueRecordAudio
          :ref="`audio_${eldata.name}`"
          mode="press"
          @result="onRecordingResult"
        />
      </div>
      <div
        v-show="audioSrc"
        v-if="eldata.canRecordAudio"
        class="audio-controls"
      >
        <div
          v-show="audioSrc"
          :class="`mic delete`"
          @click="deleteAudioFile"
        >
          <img
            src="@/assets/delete.svg"
            style="height: 1.3rem"
            alt="Delete audio"
            title="Delete audio"
          >
          <audio
            :ref="`playback_${eldata.name}`"
            :src="audioSrc"
            @ended="playbackEnded"
          />
        </div>
        <div
          v-show="audioSrc"
          :class="`mic playback ${isPlaying ? 'playing' : ''}`"
          @click="toggleAudioPlayback"
        >
          <img
            v-if="!isPlaying"
            src="@/assets/play.svg"
            style="height: 1.3rem"
            alt="Play audio"
            title="Play audio"
          >
          <img
            v-if="isPlaying"
            src="@/assets/stop.svg"
            style="height: 1.3rem"
            alt="Stop audio"
            title="Stop audio"
          >
          <audio
            :ref="`playback_${eldata.name}`"
            :src="audioSrc"
            @ended="playbackEnded"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelpText from "@/components/HelpText.vue";
export default {
  name: "TextArea",
  components: {
    HelpText,
  },
  props: ["eldata", "value"],
  data() {
    return {
      audioSrc: null,
      isRecording: false,
      isPlaying: false,
      textval: null,
      audioData: null,
      currentFile: null,
      timer: null,
      audioTimer: 0
    };
  },
  watch: {
    audioData: {
      handler: function (val) {
        console.log('audioData changed')
        this.$emit("input", {
          text: this.textval,
          audio: val,
          audioTimer: this.audioTimer
        });
      },
      deep: true
    },
    textval: {
      handler: function (val) {
        this.$emit("input", {
          text: val,
          audio: this.audioData,
          audioTimer: this.audioTimer
        });
      },
    },
  },
  created() {},
  mounted() {
    if (this.value && this.value.text) this.textval = this.value.text;
    if (this.eldata && this.eldata.canRecordAudio && this.value && this.value.audio && !this.audioData) {
      let blob = this.base64ToBlob(this.value.audio)
      this.onRecordingResult(blob);
    }
  },
  beforeDestroy () {
    this.$refs[`audio_${this.eldata.name}`] && this.$refs[`audio_${this.eldata.name}`].stop();
    if(this.timer)
        clearInterval(this.timer);
  },
  methods: {
    onRecordingResult(data) {
      this.isRecording = false;
      // console.log("The blob data:", data);
      this.blobToBase64(data);
      this.currentFile = data.slice(0, data.size, "audio/webm")
      let src = window.URL.createObjectURL(this.currentFile);
      // this.currentFile = new Blob(data, { name: `${Date.now()}-audio.${this.audioType}`, type: 'audio/wav' })
      // data.type = 'audio/wav' 
      console.log(this.currentFile)
      console.log("Downloadable audio", src);
      this.audioSrc = src;
    },
    blobToBase64(blob) {
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        var base64data = reader.result;
        this.audioData = base64data;
        // console.log(this.audioData);
      };
    },
    base64ToBlob(data, contentType = "", sliceSize = 512) {
      const byteCharacters = atob(data.split(',')[1]);
      const byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    },
    toggleAudioRecorder() {
      this.isPlaying = false;
      if (this.isRecording) {
        this.$refs[`audio_${this.eldata.name}`].stop();
        if(this.timer) clearInterval(this.timer);
      } else {
        this.isRecording = true;
        this.$refs[`audio_${this.eldata.name}`].start();
        this.timer = this.setAudioTimer()
      }
    },
    setAudioTimer() {
      this.audioTimer = 0
      return setInterval(() => this.audioTimer++, 1000)
    },
    getTimeInMinutes () {
      let value = this.audioTimer
      let minutes = parseInt(Math.floor(value / 60)); 
      let seconds= parseInt((value - (minutes * 60)) % 60); 

      let dMins = (minutes > 9 ? minutes : '0' + minutes);
      let dSecs = (seconds > 9 ? seconds : '0' + seconds);

      return dMins + ":" + dSecs;
    },
    toggleAudioPlayback() {
      this.isRecording = false;
      this.$refs[`audio_${this.eldata.name}`].stop();
      if (this.isPlaying) {
        this.$refs[`playback_${this.eldata.name}`].pause();
        this.$refs[`playback_${this.eldata.name}`].currentTime = 0;
        this.isPlaying = false;
      } else {
        this.isPlaying = true;
        this.$refs[`playback_${this.eldata.name}`].play();
      }
    },
    playbackEnded() {
      this.$refs[`playback_${this.eldata.name}`].currentTime = 0;
      this.isPlaying = false;
    },
    deleteAudioFile() {
      this.$refs[`playback_${this.eldata.name}`].currentTime = 0;
      this.isPlaying = false;
      this.audioSrc = null;
      this.audioData = null;
      this.isRecording = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.title {
  font-size: 1.1rem;
}

.vue-audio-recorder {
  display: none !important;
}

.text-area {
  text-align: left;
  padding: 5px 0;
  font-weight: 500;
  color: #555;

  &.subsection {
    padding: 5px 10px;
    font-weight: 300 !important;
  }

  .input-container {
    position: relative;
  }

  textarea {
    display: block;
    width: 100%;
    margin-top: 10px;
    padding: 10px 45px 10px 10px;
    box-sizing: border-box;
    background: #f8f8f8;
    border: 1px solid #9d9d9d;
    font-size: 1rem;
    height: 7rem;
    border-radius: 3px;
    resize: vertical;
  }

  .audio-controls {
    position: absolute;
    right: 3px;
    top: 3px;
    margin: auto;
    height: 36px;
    display: flex;
    flex-direction: row;

    .mic {
      position: static !important;
      margin-left: 10px;
    }
  }

  .mic {
    position: absolute;
    right: 3px;
    top: 3px;
    margin: auto;
    height: 36px;
    padding: 5px 8px 5px 8px;
    border-radius: 3px;
    background: #607d8b;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;

    &.recording {
      .record-title {
        display: inline-block !important;
      }

      &.mic {
        background: crimson !important;
      }
    }

    &.playing {
      .record-title {
        display: inline-block !important;
      }

      &.mic {
        background: green !important;
      }
    }

    .record-title {
      font-size: 0.9rem;
      color: #fff;
      margin: auto 5px;
      display: none;
      cursor: pointer;
    }

    &:hover {
      background: #2c3e50;

      .record-title {
        display: inline-block;
      }
    }
  }

  .desc {
    font-weight: 300;
    font-size: 1rem;
    text-align: left;
    color: #333333;
    margin-top: 5px;
  }
}
</style>
