/**
 * Created by GennadySX on @2020
 */



export const tasker = (arrList) => {
    let planning = {
        lanes: [ {
            "id": "PLANNED",
            "title": "Задачи",
            "style": {
                "width": 280,
                "background": "#1791ff"
            },
            "cards": []
        },{
            "id": "DOING",
            "title": "В прогрессе",
            "style": {
                "width": 280,
                "background": "#fa4"
            },
            "cards": []
        }, {
            "id": "TESTING",
            "title": "Тестировка",
            "style": {
                "width": 280,
                "background": "#ffdd2b"
            },
            "cards": []
        }, {
            "id": "BUGS",
            "title": "Баги",
            "style": {
                "width": 280,
                "background": "#ff4a3d"
            },
            "cards": []
        }, {
            "id": "COMPLETED",
            "title": "Завершены",
            "style": {
                "width": 280,
                "background": "#2bc259"
            },
            "cards": []
        }
        ]
    }
    return Promise.all([arrList.map((task, index) =>{
        task.id = task._id
        switch (task.type) {
            case "PLANNED":
                planning.lanes[0].cards = [...planning.lanes[0].cards, task]
                break
            case "DOING":
                planning.lanes[1].cards = [...planning.lanes[1].cards, task]
                break
            case "TESTING":
                planning.lanes[2].cards = [...planning.lanes[2].cards, task]
                break
            case "BUGS":
                planning.lanes[3].cards = [...planning.lanes[3].cards, task]
                break
            default:
                planning.lanes[4].cards = [...planning.lanes[4].cards, task]
        }
    })
]).then(res => planning)}