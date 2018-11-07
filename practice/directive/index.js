import Vue from 'vue'

// v-model.number ：修饰符，将字符串转number
// v-model.trim : 去掉首位空格
// v-model.lazy : input标签的input事件 改为 onchange 事件(输入时无变化，失去焦点后变化)
//  v-pre : 不编译 里面的内容
new Vue({
  el: '#root',
  template: `
    <div>
      <div>{{text}}</div>
      <div v-pre>{{text}}</div>
      <div v-model.number="text"></div>
      <div v-text="text"></div>
      <div v-html="html"></div>
      <div v-show="active">{{text}}</div>
      <div v-if="active">{{text}}</div>
      <div v-else>else content</div>


      <input text="text" v-model.lazy="text" />
      <input text="text" v-model="text" />
      <input type="checkbox" v-model="active" />
      <div>
        <input type="checkbox" :value="1" v-model="arr" />
        <input type="checkbox" :value="2" v-model="arr" />
        <input type="checkbox" :value="3" v-model="arr" />
      </div>
      <div>
        <input type="radio" value="one" v-model="pick"/>
        <input type="radio" value="twe" v-model="pick"/>
      </div>

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
    arr: [1, 2, 3],
    pick: '',
    obj: {
      a: 2,
      b: 3,
      c: 4
    }
  }
})
