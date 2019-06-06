const int ledPin = LED_BUILTIN;

int value;
int notes;

void setup() {
  pinMode(A0, INPUT);
  pinMode(A1, INPUT);
  pinMode(A2, INPUT);
  pinMode(A3, INPUT);
  Serial.begin(9600);
  Serial.println("setup");
}

void loop() {

  notes=0;
  
  if (analogRead(A0)<600) {
    notes+=1;
  }
  if (analogRead(A1)<600) {
    notes+=2;
  }
  if (analogRead(A2)<600) {
    notes+=4;
  }
  if (analogRead(A3)<600) {
    notes+=8;
  }
  
  Serial.print("notes");
  Serial.println(notes);
  
  delay(100);
}
