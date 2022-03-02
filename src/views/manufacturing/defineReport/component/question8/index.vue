<template>
  <div shadow="always">
    <div v-for="(line, index) in lines" v-bind:key="index" class="row">
      <div >
        <el-row>
          <el-col :span="24">
              <div class="grid-content bg-purple-light">
                  <el-tooltip content="Quét QR" placement="top">
                <el-button type="info" plain><i class="fas fa-qrcode"></i></el-button>
                  </el-tooltip>
              </div>
            </el-col>
        </el-row>
        
      </div>
      <!-- <div>
        <el-switch v-model="line.require"></el-switch>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lines: [],
      typeQuestion: '',
      title: '',
      Require: true,
      blockRemoval: true,
      phoneUsageTypes: [
        {
          label: 'Home', value: 'home'
        }, {
          label: 'Work', value: 'work'
        }, {
          label: 'Mobile', value: 'mobile'
        }, {
          label: 'Fax', value: 'fax'
        }
      ],
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
      //alert('djdj')
    },
  },
  mounted () {
    this.addLine()
  }
}
</script>