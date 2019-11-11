#include <node.h>
#include <string>
#include <iostream>
#include <v8.h>

#include <nan.h>
#include <x509.h>

using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Persistent;
using v8::String;
using v8::Value;
using v8::Array;
using v8::Exception;


// void init(Local<Object> exports) {
NAN_MODULE_INIT(init){
  // Nan::Set(target,
  //   Nan::New<String>("version").ToLocalChecked(),
  //   Nan::GetFunction(Nan::New<v8::FunctionTemplate>(VERSION)).ToLocalChecked()
  // );
   
  Nan::Set(target,
    Nan::New<String>("verify").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(verify)).ToLocalChecked() );
    // Nan::New<FunctionTemplate>(verify)->GetFunction());

  Nan::Set(target,
    Nan::New<String>("getAltNames").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(get_altnames)).ToLocalChecked() );
    // Nan::New<FunctionTemplate>(get_altnames)->GetFunction());
  Nan::Set(target,
    Nan::New<String>("getSubject").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(get_subject)).ToLocalChecked() );
    // Nan::New<FunctionTemplate>(get_subject)->GetFunction());
  Nan::Set(target,
    Nan::New<String>("getIssuer").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(get_issuer)).ToLocalChecked() );
    // Nan::New<FunctionTemplate>(get_issuer)->GetFunction());
  Nan::Set(target,
    Nan::New<String>("parseCert").ToLocalChecked(),
    Nan::GetFunction(Nan::New<v8::FunctionTemplate>(parse_cert)).ToLocalChecked() );
    // Nan::New<FunctionTemplate>(parse_cert)->GetFunction());
}

NODE_MODULE(x509, init)
