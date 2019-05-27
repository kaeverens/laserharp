const int note0 = A0;
const int ledPin = LED_BUILTIN;

int value;
int notes;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(note0
  , INPUT);
  Serial.begin(9600);
  Serial.println("setup");
}

void loop() {

  notes=0;
  
  value=analogRead(note0);
  Serial.print("a0_");
  Serial.println(value);
  if (value>600) {
    digitalWrite(ledPin, LOW);
  }
  else {
    digitalWrite(ledPin, HIGH);
    notes+=1;
  }
  
  Serial.print("notes");
  Serial.println(notes);
  
  delay(100);
}
