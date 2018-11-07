import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <div>{{text}}</div>
      <div v-text="text"></div>
      <div v-html="html"></div>
      <div v-show="active">{{text}}</div>
      <div v-if="active">{{text}}</div>
      <div v-else>else content</div>
      <div>
        <p v-if='active'>Text: {{text}}</p>
        <p v-else-if='text === 0'>Else Text</p>
      </div>
      
      <ul>
        <li v-for="(item,index) in arr" :key='item'>{{item}} : {{index}}</li>
      </ul>
      <ul>
        <li v-for="(item,key, index) in obj">{{item}} : {{key}}: {{index}}</li>
      </ul>

    </div>
  `,
  data: {
    text: 0,
    active: false,
    html: '<span>this is html</span>',
    arr: [1, 23, 3],
    obj: {
      a: 2,
      b: 3,
      c: 4
    }
  }
})
