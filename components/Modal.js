import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { Card, Button, CardItem, Text, ListItem, H2, Icon, Right } from "native-base";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


function SimpleDialog(props) {
  const { onClose, selectedValue } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <View>
      <Dialog
        visible={props.open}
        footer={
          <DialogFooter>
            <DialogButton
              text="CANCEL"
              onPress={() => handleClose()}
            />
            <DialogButton
              text="OK"
              onPress={() => handleClose()}
            />
          </DialogFooter>
        }
      >
        <DialogContent>
          <H2 style={{
            flexDirection: "row",
            paddingTop: 30,
            paddingLeft: 10,
            paddingRight: 10,
          }}>Результат проверки чека</H2>
          <Table style={{padding: 10}} borderStyle={{borderWidth: 0}}>
            <Rows data={infoHeader} textStyle={styles.TableText}/>
          </Table>
          <Table style={{padding: 10}} borderStyle={{borderWidth: 0}}>
            <Rows data={body} textStyle={styles.TableText}/>
          </Table>
          <Button iconLeft bordered success style={{
            padding: 10,
            alignSelf: "center",
          }}>
            <Text style={{color: 'green'}}>Сохранить</Text>
            <Icon name='arrow-down' />
          </Button>
        </DialogContent>
      </Dialog>
    </View>
  );
}

const infoHeader = [
  ['ИИН/БИН', 1],
  ['Сер. номер ККМ', 1],
  ['Регистрационный номер', 1],
  ['Вид платежа'],
  ['ФП', 1],
  ['Дата', 1],
]

const header = [
  'Название', 'Цена', 'Количество', 'Сумма'
];

const body = [
  ['Название', 'Цена', 'Количество', 'Сумма']
]

const styles = StyleSheet.create({
  HeadStyle: { 
    height: 50,
    alignContent: "center",
    backgroundColor: '#ffe0f0'
  },
  TableText: { 
    margin: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    
    fontSize: 11
  },
  baseText: {
    fontWeight: 'bold',
    fontSize: 11
  },
  innerText: {
    fontSize: 11,
    fontWeight: 'normal'
  }
});
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default function Modal(props) {
  return (
    <SimpleDialog selectedValue={[]} open={props.opened} onClose={props.onClose} />
  );
}