<template>
  <div shadow="always">
    <div v-for="(line, index) in lines" v-bind:key="index" class="row">
      <div >
        <el-row>
          <el-col :span="24">
              <div class="grid-content bg-purple-light">
                <el-input placeholder="Câu trả lời" v-model="line.SelectAnswer" ></el-input>
              </div>
            </el-col>
        </el-row>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhoneNumberLine',
  data () {
    return {
      lines: [],
      typeQuestion: '',
      title: '',
      Require: true,
      blockRemoval: true,
      countryPhoneCodes: [
        {
          label: '+90',
          value: '+90'
        }, {
          label: '+1',
          value: '+1'
        }
      ],
       types: [
        {
          label: 'Multiple choice',
          value: '1'
        }, {
          label: 'Checkboxes',
          value: '2'
        }, {
          label: 'Paragraph',
          value: '3'
        }
      ]
    }
  },
  watch: {
    lines () {
      this.blockRemoval = this.lines.length <= 1
    }
  },
  methods: {
    addLine () {
      let checkEmptyLines = this.lines.filter(line => line.number === null)
      if (checkEmptyLines.length >= 1 && this.lines.length > 0) return
      this.lines.push({
        countryCode: null,
        number: null,
        Require: true
      })
    },
    removeLine (lineId) {
      if (!this.blockRemoval) this.lines.splice(lineId, 1)
    },
    ChangeQuestion(){
    },
  },
  mounted () {
    this.addLine()
  }
}
</script>