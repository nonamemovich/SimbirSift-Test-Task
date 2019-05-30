export const ShowComponent = {
    TaskList: 0,
    Task: 1,
    LoginForm: 2
}

export const priorityJSON = {
    low: 'Низкий',
    medium: 'Средний',
    hight: 'Высокий'
}

export const priorityStyle = {
    low: 'alert alert-primary',
    medium: 'alert alert-warning',
    hight: 'alert alert-danger'
}

export const taskStatus = {
    done: 'Готово',
    plane: 'План',
    doing: 'В процессе'
}

export const TaskList = [
    {
        id: 1,
        description: 'Встать утром',
        fullDescription: 'Проснуться пораньше что бы успеть собраться в спортзал.',
        StartDate: new Date('2019-05-28T07:00:00'),
        planeTime: 6,
        allottedTime: 4,
        priority: 'hight',
        status: 'done'
    }, {
        id: 2,
        description: 'Приготовить завтрак',
        fullDescription: 'Лучше всего подойдёт яичница с кашей, в качестве напитка приготовить кофе.',
        StartDate: new Date('2019-05-28T07:15:00'),
        planeTime: 6,
        allottedTime: 1,
        priority: 'hight',
        status: 'doing'
    },{
        id: 3,
        description: 'Просмотр статей на хабре',
        fullDescription: 'Просмотреть статьи по тегам <js> <c#> и популярные за последние сутки',
        StartDate: new Date('2019-05-28T07:25:00'),
        planeTime: 6,
        allottedTime: 1,
        priority: 'medium',
        status: 'plane'
    }
]