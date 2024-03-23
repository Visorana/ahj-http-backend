module.exports =  class Tickets {
    constructor() {
      this.tickets = [];
  
      this.tickets.push(
        {
          id: 1,
          name: 'Поменять краску в принтере, ком. 404',
          description: 'Принтер HP LJ 1210, картриджи на складе',
          status: '0',
          created: '1711146498932',
        },
        {
          id: 2,
          name: 'Переустановить Windows, ПК-Hall24',
          description: `Ссылка: https://www.microsoft.com/ru-ru/software-download/windows11\nЗаранее отформатировать установочную флешку`,
          status: '0',
          created: '1711146689032',
        },
        {
          id: 3,
          name: 'Устанговить обновление КВ-XXX',
          description: `Вышло критическое обновление для Windows, нужно поставить обновления в следующем приоритете:\n1. Сервера (не забыть сделать бэкап!)\n2. Рабочие станции`,
          status: '1',
          created: '1711146759032',
        },
      );
    }
  
    allTickets() {
      const ticketsShort = this.tickets.map(({
        id, name, status, created,
      }) => ({
        id, name, status, created,
      }));
      return ticketsShort;
    }
  
    ticketById(id) {
      return this.tickets.find((ticket) => ticket.id === +id);
    }
  
    createTicket(name, description) {
      const maxId = this.tickets.reduce((acc, curr) => (acc.id > curr.id ? acc.id : curr.id));
      this.tickets.push(
        {
          id: maxId + 1,
          name,
          description,
          status: 0,
          created: Date.now(),
        },
      );
    }
  
    deleteTicket(id) {
      const ticketIndex = this.tickets.findIndex((ticket) => ticket.id === id);
      this.tickets.splice(ticketIndex, 1);
    }
  
    changeStatus(id) {
      const ticket = this.tickets.find((ticket) => ticket.id === id);
      ticket.status = 1 - ticket.status;
    }
  
    editTicket(id, name, description) {
      const ticket = this.tickets.find((ticket) => ticket.id === id);
      ticket.name = name;
      ticket.description = description;
    }
  }