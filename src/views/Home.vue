<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaVoidField
        x-component="FormLayout"
        :x-component-props="{
          labelCol: 2,
          wrapperCol: 10,
        }"
      >
        <SchemaStringField
          name="username"
          title="姓名"
          x-decorator="FormItem"
          :x-decorator-props="{
            tooltip: '姓名名称',
          }"
          :x-validator="{ max: 5, message: '长度不能大于5' }"
          x-component="Input"
          :required="true"
        />
        <SchemaStringField
          name="age"
          title="年龄"
          x-decorator="FormItem"
          x-component="Select"
          :required="true"
          :x-component-props="{
            remote: true,
            style: {
              width: '240px',
            },
          }"
        />
        <SchemaStringField
          name="money"
          title="金额"
          x-decorator="FormItem"
          :x-decorator-props="{
            tooltip: '请输入金额',
          }"
          :x-validator="{
            is_valid_two_dots: true,
            message: '错误了❎'
          }"
          x-component="Input"
          :required="true"
        />
      </SchemaVoidField>
    </SchemaField>
    <Submit @submit="onSubmit">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm, onFieldInit, onFieldReact, registerValidateRules } from "@formily/core";
import { createSchemaField, FormProvider } from "@formily/vue";
import { action } from "@formily/reactive";
import { FormLayout, FormItem, Input, Select, Submit } from "@formily/element";
import request from "@/api/mock";

const fields = createSchemaField({
  components: { FormLayout, FormItem, Input, Select },
});

// 自定义校验规则
registerValidateRules({
  is_valid_two_dots(value, rule){
    if(!value) return ''
    let regx = /^(\d{1,2}(\.\d{1,4})?)$/g
    if(!regx.test(value)){
      return '输入的数字必须为100以内的正整数，并且不能超过4位小数'
    }
  }
})

const service = () => {
  return new Promise((resolve) => {
    request.get("/users").then(function (response) {
      resolve(response.data.users);
    });
  });
};

const useAsyncSelect = (pattern, service) => {
  onFieldInit(pattern, (field) => {
    field.loading = true;
    service().then(
      action.bound((data) => {
        field.dataSource = data;
        field.loading = false;
      })
    );
  });
};

export default {
  components: { FormProvider, ...fields, Submit },
  data() {
    const form = createForm({
      effects: () => {
        useAsyncSelect("age", service);
      },
    });
    return {
      form,
    };
  },
  mounted() {
    console.log('maths arguments');
  },
  methods: {
    onSubmit(value) {
      console.log(value);
    },
  },
};
</script>
